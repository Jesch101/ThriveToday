const requireLogin = (req, res, next) => {
  if (req.session?.loggedIn && req.session?.userID) {
    next();
  } else {
    res.status(401).send("You must be logged in to access this resource");
  }
};

module.exports = { requireLogin };
