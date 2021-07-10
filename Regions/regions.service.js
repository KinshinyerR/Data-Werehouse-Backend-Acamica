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

    const countryDB = await Country.findOne({ name });
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
    // const regionDB = await Region.findById(regionId);
    // if (!regionDB) {
    //   throw new Error(`La region no se encuentra registrada`);
    // }

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

/* GET ALL REGIONS */
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

/* Update A REGION */
async function updateRegion(req, res) {
  const { regionName, newRegionName } = req.body;
  try {
    const regionDB = await Region.findOne({ regionName });
    if (!regionDB) {
      throw new Error(`La region ${regionName} no se encuentra registrada`);
    }
    regionDB.regionName = newRegionName;
    await regionDB.save();
    res.status(200).send(regionDB);
  } catch (error) {
    console.log({ error });
    res.status(400).send(error.message);
  }
}

/* UPDATE A CONTRY IN THE REGION */
async function updateCountry(req, res) {
  const {
    regionName,
    countryList: [{ countryName }],
    newCountryName,
  } = req.body;
  try {
    const regionDB = await Region.findOne({ regionName });
    if (!regionDB) {
      throw new Error(`La region ${regionName} no se encuentra registrada`);
    }

    const existsCountry = regionDB.countryList.findIndex(
      (country) => country.countryName === countryName
    );

    if (existsCountry < 0) {
      throw new Error(`El país ${countryName} no se encuentra registrado`);
    }

    regionDB.countryList[existsCountry].countryName = newCountryName;
    await regionDB.save();
    res.status(200).send(regionDB);
  } catch (error) {
    console.log({ error });
    res.status(400).send(error.message);
  }
}

/* UPDATE A CITY IN THE COUNTRY */
async function updateCity(req, res) {
  const {
    regionName,
    countryList: [{ countryName, cityList }],
    newCityName,
  } = req.body;
  try {
    const regionDB = await Region.findOne({ regionName });
    if (!regionDB) {
      throw new Error(`La region ${regionName} no se encuentra registrada`);
    }

    const existsCountry = await regionDB.countryList.findIndex(
      (country) => country.countryName === countryName
    );

    if (existsCountry < 0) {
      throw new Error(`El pais ${countryName} no se encuentra registrado`);
    }

    const existsCity = await regionDB.countryList[
      existsCountry
    ].cityList.findIndex((city) => city.cityName == cityList[0].cityName);

    if (existsCity < 0) {
      throw new Error(
        `La Ciudad ${cityList[0].cityName} no se encuentra registrada`
      );
    }

    regionDB.countryList[existsCountry].cityList[existsCity].cityName =
      newCityName;

    await regionDB.save();
    res.status(200).send(regionDB);
  } catch (error) {
    console.log({ error });
    res.status(400).send(error.message);
  }
}

/* DELETE A REGION */
async function deleteRegion(req, res) {
  const { regionName } = req.body;
  try {
    const regionDB = await Region.findOne({ regionName: regionName });

    if (!regionDB) {
      throw new Error(`La region ${regionName} no se encuentra registrada`);
    }

    regionDB.remove({ regionName: regionName });
    res.status(200).send("Region eliminada con exito");
  } catch (error) {
    console.log({ error });
    res.status(400).json(error.message);
  }
}

/* DELETE A COUNTRY IN THE REGION */
async function deleteCountry(req, res) {
  const {
    regionName,
    countryList: [{ countryName }],
  } = req.body;
  try {
    const regionDB = await Region.findOne({ regionName });
    if (!regionDB) {
      throw new Error(`La region ${regionName} no se encuentra registrada`);
    }

    const existsCountry = regionDB.countryList.findIndex(
      (country) => country.countryName === countryName
    );

    if (existsCountry < 0) {
      throw new Error(`El país ${countryName} no se encuentra registrado`);
    }

    const countryDelete = regionDB.countryList[existsCountry];
    countryDelete.remove({
      countryName: countryName,
    });

    if (!countryDelete) {
      throw new Error(`El país ${countryName} no fue eliminado`);
    }

    await regionDB.save();
    res.status(200).send("País eliminado con exito");
  } catch (error) {
    console.log({ error });
    res.status(400).send(error.message);
  }
}

/* DELETE A CITY IN THE COUNTRY */
async function deleteCity(req, res) {
  const {
    regionName,
    countryList: [{ countryName, cityList }],
  } = req.body;
  try {
    const regionDB = await Region.findOne({ regionName });
    if (!regionDB) {
      throw new Error(`La region ${regionName} no se encuentra registrada`);
    }

    const existsCountry = await regionDB.countryList.findIndex(
      (country) => country.countryName === countryName
    );

    if (existsCountry < 0) {
      throw new Error(`El pais ${countryName} no se encuentra registrado`);
    }

    const existsCity = await regionDB.countryList[
      existsCountry
    ].cityList.findIndex((city) => city.cityName == cityList[0].cityName);

    if (existsCity < 0) {
      throw new Error(
        `La Ciudad ${cityList[0].cityName} no se encuentra registrada`
      );
    }

    const cityDelete = regionDB.countryList[existsCountry].cityList[existsCity];

    cityDelete.remove({ cityName: cityDelete.cityName });

    if (!cityDelete) {
      throw new Error(`La ciudad ${cityName} no fue eliminado`);
    }

    await regionDB.save();
    res.status(200).send("Ciudad eliminada con exito");
  } catch (error) {
    console.log({ error });
    res.status(400).send(error.message);
  }
}

module.exports = {
  addRegion,
  addCountry,
  addCity,
  all,
  updateRegion,
  updateCountry,
  updateCity,
  deleteRegion,
  deleteCountry,
  deleteCity,
};
