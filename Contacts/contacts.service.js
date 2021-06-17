const Contact = require("./contacts.model");
const Company = require("../Companies/companies.model");
const Region = require("../Regions/regions.model");

/* GET ALL CONTACTS */
function all(req, res) {
  Contact.find()
    .then((contacts) => {
      res.send(contacts);
    })
    .catch((error) => {
      console.log({ error });
      res.status(400).json(error);
    });
}
/* GET A CONTACTS BY EMAIL */
async function byEmail(req, res) {
  const { email } = req.body;
  try {
    const contactDB = await Contact.findOne({ email: email });
    if (!contactDB) {
      throw new Error(`El email ${email} NO se encuentra registrado`);
    }
    res.send(contactDB);
  } catch (error) {
    console.log({ error });
    res.status(400).send(error.message);
  }
}
/*REGISTER A CONTACT*/
async function register(req, res) {
  const {
    email,
    region,
    country,
    city,
    company: { name },
  } = req.body;
  let cityCheck = false;
  let regionExists = false;
  let countryExists = false;

  try {
    const contactDB = await Contact.findOne({ email });
    if (contactDB) {
      throw new Error(
        `El contacto con email ${email} ya se encuentra registrado`
      );
    }

    const regionDB = await Region.find();

    for (let i = 0; i < regionDB.length; i++) {
      if (regionDB[i].regionName === region) {
        regionExists = true;
        const element = regionDB[i].countryList;
        for (let j = 0; j < element.length; j++) {
          if (element[j].countryName === country) {
            countryExists = true;
            const clist = element[j].cityList;
            for (let k = 0; k < clist.length; k++) {
              const cityname = clist[k].cityName;
              if (cityname === city) {
                cityCheck = true;
              }
            }
          }
        }
      }
    }

    if (!regionExists) {
      throw new Error(`La región ${region} no se encuentra registrada`);
    } else if (regionExists && !countryExists) {
      throw new Error(
        `El país ${country} no se encuentra registrado en la region ${region}`
      );
    } else if (regionExists && countryExists && !cityCheck) {
      throw new Error(
        `La ciudad ${city} no se encuentra registrada en el país ${country}`
      );
    }

    const companyDB = await Company.findOne({ name });
    if (!companyDB) {
      throw new Error(`La compañia ${name} no se encuentra registrada`);
    }

    const newContact = new Contact(req.body);
    newContact.company.name = companyDB.name;
    newContact.company.address = companyDB.address;
    newContact.company.email = companyDB.email;
    newContact.company.phone = companyDB.phone;
    newContact.company.city = companyDB.city;
    newContact.company.country = companyDB.country;
    newContact.company.region = companyDB.region;

    await newContact.save();
    res.status(200).send(newContact);
  } catch (error) {
    console.log({ error });
    res.status(400).send(error.message);
  }
}
/* UPDATE A CONTACT BY EMAIL */
async function update(req, res) {
  const {
    email,
    region,
    country,
    city,
    company: { name },
  } = req.body;
  let cityCheck = false;
  let regionExists = false;
  let countryExists = false;

  try {
    const contactDB = await Contact.findOne({ email });
    if (!contactDB) {
      throw new Error(
        `El contacto con email ${email} NO se encuentra registrado`
      );
    }

    const regionDB = await Region.find();

    for (let i = 0; i < regionDB.length; i++) {
      if (regionDB[i].regionName === region) {
        regionExists = true;
        const element = regionDB[i].countryList;
        for (let j = 0; j < element.length; j++) {
          if (element[j].countryName === country) {
            countryExists = true;
            const clist = element[j].cityList;
            for (let k = 0; k < clist.length; k++) {
              const cityname = clist[k].cityName;
              if (cityname === city) {
                cityCheck = true;
              }
            }
          }
        }
      }
    }

    if (!regionExists) {
      throw new Error(`La región ${region} no se encuentra registrada`);
    } else if (regionExists && !countryExists) {
      throw new Error(
        `El país ${country} no se encuentra registrado en la region ${region}`
      );
    } else if (regionExists && countryExists && !cityCheck) {
      throw new Error(
        `La ciudad ${city} no se encuentra registrada en el país ${country}`
      );
    }

    const companyDB = await Company.findOne({ name });
    if (!companyDB) {
      throw new Error(`La compañia ${name} no se encuentra registrada`);
    }

    Object.assign(contactDB, req.body);
    contactDB.company.name = companyDB.name;
    contactDB.company.address = companyDB.address;
    contactDB.company.email = companyDB.email;
    contactDB.company.phone = companyDB.phone;
    contactDB.company.city = companyDB.city;
    contactDB.company.country = companyDB.country;
    contactDB.company.region = companyDB.region;

    await contactDB.save();
    res.status(200).send(contactDB);
  } catch (error) {
    console.log({ error });
    res.status(400).send(error.message);
  }
}
/* DELETE A CONTACT BY EMAIL */
async function remove(req, res) {
  const { email } = req.body;
  try {
    const contactDB = await Contact.findOne({ email: email });

    if (!contactDB) {
      throw new Error(`El contacto ${email} no se encuentra registrado`);
    }

    contactDB.remove({ email: email });
    res.status(200).send("Contacto eliminado con exito");
  } catch (error) {
    console.log({ error });
    res.status(400).json(error.message);
  }
}

module.exports = { all, byEmail, register, update, remove };
