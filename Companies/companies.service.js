const Company = require("./companies.model");
const City = require("../Regions/city.model");

/* GET ALL COMPANIES */
function all(req, res) {
  Company.find()
    .populate("cityId")
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
    const companyDB = await Company.findOne({ email: email }).populate(
      "cityId"
    );
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
  const { email, cityId } = req.body;
  try {
    const companyDB = await Company.findOne({ email });
    if (companyDB) {
      throw new Error(
        `La Compañia con email ${email} ya se encuentra registrada`
      );
    }

    const cityDB = await City.findById(cityId);

    if (!cityDB) {
      throw new Error(`La ciudad no se encuentra registrada`);
    }
    const newCompany = new Company(req.body);

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
