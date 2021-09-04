const Contact = require("./contacts.model");
const Company = require("../Companies/companies.model");
const Region = require("../Regions/region.model");
const Country = require("../Regions/country.model");
const City = require("../Regions/city.model");
const upload = require("../middlewares/upload");

/* GET ALL CONTACTS */
function all(req, res) {
  const { search } = req.query;
  const regex = new RegExp(search, "i");
  Contact.find(
    search
      ? {
          $or: [
            { name: { $regex: regex } },
            { surname: { $regex: regex } },
            { position: { $regex: regex } },
            { email: { $regex: regex } },
          ],
        }
      : {}
  )
    .populate("companyId")
    .populate({ path: "countryId", select: "name" })
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
    const contactDB = await Contact.findOne({ email: email }).populate({
      path: "companyId",
      select: "name",
    }); /* POPULATE A COMPANY, REGION, COUNTRY Y CITY */
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
  const { email, regionId, countryId, cityId, companyId } = req.body;

  try {
    const contactDB = await Contact.findOne({ email });
    if (contactDB) {
      throw new Error(
        `El contacto con email ${email} ya se encuentra registrado`
      );
    }

    const regionDB = await Region.findById(regionId);

    const countryDB = await Country.findById(countryId);

    const cityDB = await City.findById(cityId);

    if (!regionDB) {
      throw new Error(`La región no se encuentra registrada`);
    } else if (regionDB && !countryDB) {
      throw new Error(`El país no se encuentra registrado`);
    } else if (regionDB && countryDB && !cityDB) {
      throw new Error(`La ciudad no se encuentra registrada`);
    }

    const country = await regionDB.countries.includes(countryId);

    if (!country) {
      throw new Error(`Region o País incorrecto`);
    }

    const cities = await countryDB.cities.includes(cityId);

    if (!cities) {
      throw new Error(`País o Ciudad incorrecta`);
    }

    const companyDB = await Company.findById(companyId);
    if (!companyDB) {
      throw new Error(`La compañia no se encuentra registrada`);
    }

    const newContact = new Contact(req.body);

    await newContact.save();
    res.status(200).send(newContact);
  } catch (error) {
    console.log({ error });
    res.status(400).send(error.message);
  }
}
/* UPDATE A CONTACT BY EMAIL */
async function update(req, res) {
  const { email, regionId, countryId, cityId, companyId } = req.body;

  try {
    const contactDB = await Contact.findOne({ email });
    if (!contactDB) {
      throw new Error(
        `El contacto con email ${email} NO se encuentra registrado`
      );
    }

    const companyDB = await Company.findById(companyId);
    if (!companyDB) {
      throw new Error(`La compañia no se encuentra registrada`);
    }

    const regionDB = await Region.findById(regionId);

    const countryDB = await Country.findById(countryId);

    const cityDB = await City.findById(cityId);

    if (!regionDB) {
      throw new Error(`La región no se encuentra registrada`);
    } else if (regionDB && !countryDB) {
      throw new Error(`El país no se encuentra registrado`);
    } else if (regionDB && countryDB && !cityDB) {
      throw new Error(`La ciudad no se encuentra registrada`);
    }

    const country = await regionDB.countries.includes(countryId);

    if (!country) {
      throw new Error(`Region o País incorrecto`);
    }

    const cities = await countryDB.cities.includes(cityId);

    if (!cities) {
      throw new Error(`País o Ciudad incorrecta`);
    }

    Object.assign(contactDB, req.body);

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

const uploadFile = async (req, res) => {
  try {
    await upload(req, res);

    console.log(req.file);
    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }

    return res.send(`File has been uploaded.`);
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload image: ${error}`);
  }
};

module.exports = { all, byEmail, register, update, remove, uploadFile };
