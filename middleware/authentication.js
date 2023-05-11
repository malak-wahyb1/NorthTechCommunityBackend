import jwt from "jsonwebtoken";

export function verifyToken(req, res, next) {
  const token = req.body.token || req.headers["token"].split(" ")[1];
  if (!token) {
    return res.status(403).send("A token is required ");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    console.log(req.user);
  } catch (err) {
    return res.status(401).send(err);
  }
  return next();
}

export function isSuperAdmin(req, res, next) {
  try {
    if (req.user.role === 0) {
      return res.send({ message: "you are not a super admin" });
    } else if (req.user.role === 1) {
      return next();
    } else {
      return res.status(401).send({ message: "you are not a super admin" });
    }
  } catch (err) {
    next(err);
    res.status(401).send({ status:401,message: err.message });
  }
}
export function isAdmin(req, res, next) {
  try {
    if (req.user.role === 0||req.user.role === 1) {
      return next();
    }
    else{
      return res.status(401).send({ status:401,message:"you are not an admin"})
    }
  }catch(err) {
    next(err);
    res.status(401).send({ status:401,message: err.message });
  }
}
