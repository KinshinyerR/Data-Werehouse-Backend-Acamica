const User = require("./users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  const { email } = req.body;
  try {
    const userDB = await User.findOne({ email: email });
    if (userDB) {
      throw new Error(
        `El usuario con email ${email} ya se encuentra registrado`
      );
    }
    const newUser = new User(req.body);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    console.log({ error });
    res.status(400).send(error.message);
  }
}

function login(req, res) {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then(async (user) => {
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("Usuario y/o Contraseña incorrecta");
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.send(token);
    })
    .catch((error) => {
      console.log({ error });
      res.status(400).json(error.message);
    });
}

function all(req, res) {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      console.log({ error });
      res.status(400).json(error);
    });
}

async function byEmail(req, res) {
  const { email } = req.body;
  try {
    const userDB = await User.findOne({ email: email });
    if (!userDB) {
      throw new Error(`El email ${email} NO se encuentra registrado`);
    }
    res.send(userDB);
  } catch (error) {
    console.log({ error });
    res.status(400).send(error.message);
  }
}

async function update(req, res) {
  const { email } = req.body;
  try {
    const userDB = await User.findOne({ email: email });

    if (!userDB) {
      throw new Error(`Usuario NO encontrado`);
    }

    Object.assign(userDB, req.body);
    userDB.password = await bcrypt.hash(userDB.password, 10);
    userDB.save();
    res.status(200).send(userDB);
  } catch (error) {
    console.log({ error });
    res.status(400).send(error.message);
  }
}

function remove(req, res) {
  console.log(req.body);
  const { email } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      console.log(user);
      return user.remove({ email: email });
    })
    .then((userDeleted) => {
      res.status(200);
      res.send(`Usuario eliminado con exito`);
    })
    .catch((error) => {
      console.log({ error });
      res.status(400).json(error.message);
    });
}

async function getProfile(req, res) {
  console.log(req.user);
  try {
    if (!req.user) {
      return res.status(400).send("Usuario no encontrado");
    }
    const userDB = await User.findById(req.user._id);
    if (!userDB) {
      throw new Error(`El usuario con Id ${id} NO se encuentra registrado`);
    }
    userDB.password = undefined;
    res.send(userDB);
  } catch (error) {
    console.log({ error });
    res.status(400).send(error.message);
  }
}

module.exports = { register, login, all, byEmail, update, remove, getProfile };
