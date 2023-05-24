import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      firstname: user.firstname,
      email: user.mail,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

export const isAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authorization.slice(6, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).send({ message: "Invalid Token" });
      }
      req.user = user;
      next();
      return;
    });
  } else {
    return res.status(401).send({ message: "Token is not found" });
  }
};
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
    return;
  }
  return res.status(401).send({ message: "Admin Token is not valid" });
};

export const isCustomer = (req, res, next) => {
  if (req.user && req.user.role === "customer") {
    next();
    return;
  }
  return res.status(401).send({ message: "Coach Token is not valid" });
};
