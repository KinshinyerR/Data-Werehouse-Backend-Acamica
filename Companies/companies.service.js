const Company = require("./companies.model");
const Region = require("../Regions/region.model");

/* GET ALL COMPANIES */
function all(req, res) {
  Company.find()
    .then((companies) => {
      res.send(companies);
    })
    .catch((error) => {
      console.log({ error });
      res.status(400).json(error);
    });
}

/* GET A COMPANY BY EMAIL */
async function byEmail(req, res) {
  const { email } = req.body;
  try {
    const companyDB = await Company.findOne({ email: email });
    if (!companyDB) {
      throw new Error(`El email ${email} NO se encuentra registrado`);
    }
    res.send(companyDB);
  } catch (error) {
    console.log({ error });
    res.status(400).send(error.message);
  }
}

/*REGISTER A COMPANY*/
async function register(req, res) {
  const { email, city } = req.body;
  let find = false;
  let regioname;
  let countryname;
  let cityname;
  try {
    const companyDB = await Company.findOne({ email: email });
    if (companyDB) {
      throw new Error(
        `La Compañia con email ${email} ya se encuentra registrado`
      );
    }

    const regionDB = await Region.find();

    for (let i = 0; i < regionDB.length; i++) {
      const element = regionDB[i].countryList;
      for (let j = 0; j < element.length; j++) {
        const clist = element[j].cityList;
        for (let k = 0; k < clist.length; k++) {
          cityname = clist[k].cityName;
          if (cityname === city) {
            regioname = regionDB[i].regionName;
            countryname = element[j].countryName;
            find = true;
          }
        }
      }
    }

    if (!find) {
      throw new Error(`La ciudad ${city} no se encuentra registrada`);
    }
    const newCompany = new Company(req.body);
    newCompany.city = city;
    newCompany.country = countryname;
    newCompany.region = regioname;
    await newCompany.save();
    res.status(200).send(newCompany);
  } catch (error) {
    console.log({ error });
    res.status(400).send(error.message);
  }
}

/* UPDATE A COMPANY BY EMAIL */
async function update(req, res) {
  const { email } = req.body;
  try {
    const companyDB = await Company.findOne({ email: email });

    if (!companyDB) {
      throw new Error(`Compañia NO encontrada`);
    }

    Object.assign(companyDB, req.body);
    companyDB.save();
    res.status(200).send(companyDB);
  } catch (error) {
    console.log({ error });
    res.status(400).send(error.message);
  }
}

/* DELETE A COMPANY BY EMAIL */
function remove(req, res) {
  const { email } = req.body;
  Company.findOne({ email: email })
    .then((company) => {
      return company.remove({ email: email });
    })
    .then((comapnyDeleted) => {
      res.status(200);
      res.send(`${comapnyDeleted} Usuario eliminado con exito`);
    })
    .catch((error) => {
      console.log({ error });
      res.status(400).json(error.message);
    });
}

module.exports = { all, byEmail, register, update, remove };
