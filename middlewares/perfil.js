const verifyPerfil = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.perfil)) {
    res.status(401).send("Perfil no permitido");
  } else {
    next();
  }
};

module.exports = verifyPerfil;
