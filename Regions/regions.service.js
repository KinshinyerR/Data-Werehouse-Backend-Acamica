const Region = require("./region.model");
const Country = require("./country.model");
const City = require("./city.model");

/* REGISTER A REGION */
async function addRegion(req, res) {
  const { name } = req.body;
  try {
    const regionDB = await Region.findOne({ name });
    if (regionDB) {
      throw new Error(`La region ${name} ya se encuentra registrada`);
    }
    const newRegion = new Region(req.body);
    await newRegion.save();
    res.status(200).send(newRegion);
  } catch (error) {
    console.log({ error });
    res.status(400).send(error.message);
  }
}

/* REGISTER A CONTRY IN THE REGION */
async function addCountry(req, res) {
  const { regionId, name } = req.body;
  try {
    const regionDB = await Region.findById(regionId);
    if (!regionDB) {
      throw new Error(`La region no se encuentra registrada`);
    }

    const countryDB = await Country.findOne({ name: name });
    if (countryDB) {
      throw new Error(`El país ya se encuentra registrado`);
    }

    const newCountry = new Country(req.body);

    await newCountry.save();

    await regionDB.update(
      { $push: { countries: newCountry._id } },
      { new: true, useFindAndModify: false }
    );

    res.status(200).send(newCountry);
  } catch (error) {
    console.log({ error });
    res.status(400).send(error.message);
  }
}

/* REGISTER A CITY IN THE COUNTRY */
async function addCity(req, res) {
  const { countryId, name } = req.body;
  try {
    const countryDB = await Country.findById(countryId);
    if (!countryDB) {
      throw new Error(`El país no se encuentra registrado`);
    }

    const cityDB = await Country.findOne({ name });
    if (cityDB) {
      throw new Error(`La ciudad ya se encuentra registrada`);
    }

    const newCity = new City(req.body);

    await newCity.save();

    await countryDB.update(
      { $push: { cities: newCity._id } },
      { new: true, useFindAndModify: false }
    );

    res.status(200).send(newCity);
  } catch (error) {
    console.log({ error });
    res.status(400).send(error.message);
  }
}

/* GET ALL REGIONS/COUNTRIES/CITIES */
function all(req, res) {
  Region.find()
    .populate({ path: "countries", populate: { path: "cities" } })
    .then((regions) => {
      res.send(regions);
    })
    .catch((error) => {
      console.log({ error });
      res.status(400).json(error);
    });
}

/* GET ALL REGIONS */
function allRegions(req, res) {
  Region.find()
    .then((regions) => {
      res.send(regions);
    })
    .catch((error) => {
      console.log({ error });
      res.status(400).json(error);
    });
}

/* GET ALL COUNTRIES  */
function allCountries(req, res) {
  Country.find()
    .then((countries) => {
      res.send(countries);
    })
    .catch((error) => {
      console.log({ error });
      res.status(400).json(error);
    });
}

/* GET ALL CiTIES  */
function allCities(req, res) {
  City.find()
    .then((cities) => {
      res.send(cities);
    })
    .catch((error) => {
      console.log({ error });
      res.status(400).json(error);
    });
}

/* Update A REGION */
async function updateRegion(req, res) {
  const { regionId, name } = req.body;
  try {
    const regionDB = await Region.findById(regionId);
    if (!regionDB) {
      throw new Error(`La region no se encuentra registrada`);
    }
    regionDB.name = name;
    await regionDB.save();
    res.status(200).send(regionDB);
  } catch (error) {
    console.log({ error });
    res.status(400).send(error.message);
  }
}

/* UPDATE A CONTRY IN THE REGION */
async function updateCountry(req, res) {
  const { countryId, name } = req.body;
  try {
    const countryDB = await Country.findById(countryId);
    if (!countryDB) {
      throw new Error(`El país no se encuentra registrado`);
    }
    countryDB.name = name;
    await countryDB.save();
    res.status(200).send(countryDB);
  } catch (error) {
    console.log({ error });
    res.status(400).send(error.message);
  }
}

/* UPDATE A CITY IN THE COUNTRY */
async function updateCity(req, res) {
  const { cityId, name } = req.body;
  try {
    const cityDB = await City.findById(cityId);
    if (!cityDB) {
      throw new Error(`La ciudad no se encuentra registrada`);
    }
    cityDB.name = name;
    await cityDB.save();
    res.status(200).send(cityDB);
  } catch (error) {
    console.log({ error });
    res.status(400).send(error.message);
  }
}

/* DELETE A REGION */
async function deleteRegion(req, res) {
  const { regionId } = req.body;
  try {
    const regionDB = await Region.findById(regionId);

    if (!regionDB) {
      throw new Error(`La region no se encuentra registrada`);
    }

    regionDB.remove({ _id: regionId });
    res.status(200).send("Region eliminada con exito");
  } catch (error) {
    console.log({ error });
    res.status(400).json(error.message);
  }
}

/* DELETE A COUNTRY IN THE REGION */
async function deleteCountry(req, res) {
  const { countryId } = req.body;
  try {
    const countryDB = await Country.findById(countryId);

    if (!countryDB) {
      throw new Error(`El País no se encuentra registrado`);
    }

    countryDB.remove({ _id: countryId });
    res.status(200).send("País eliminada con exito");
  } catch (error) {
    console.log({ error });
    res.status(400).json(error.message);
  }
}

/* DELETE A CITY IN THE COUNTRY */
async function deleteCity(req, res) {
  const { cityId } = req.body;
  try {
    const cityDB = await City.findById(cityId);

    if (!cityDB) {
      throw new Error(`La Ciudad no se encuentra registrado`);
    }

    cityDB.remove({ _id: cityId });
    res.status(200).send("Ciudad eliminada con exito");
  } catch (error) {
    console.log({ error });
    res.status(400).json(error.message);
  }
}

module.exports = {
  addRegion,
  addCountry,
  addCity,
  all,
  allRegions,
  allCountries,
  allCities,
  updateRegion,
  updateCountry,
  updateCity,
  deleteRegion,
  deleteCountry,
  deleteCity,
};
