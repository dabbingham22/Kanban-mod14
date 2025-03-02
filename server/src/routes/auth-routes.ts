import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  const { username, password } = req.body; // get username and password from the req body

  //find the user
  const user = await User.findOne({
    where: { username },
  });
  //if not user then return 401 error
  if (!user) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  //compare password
  const passwordIsValid = await bcrypt.compare(password, user.password);

  //if password is not valid return 401 error
  if (!passwordIsValid) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  // get secret key
  const secretKey = process.env.JWT_SECRET_KEY || "";

  //token sign for user and allows them to stay signed in for 1hr before expiring
  const token = jwt.sign({ username, id: user.id }, secretKey, { expiresIn: "1h" });
  return res.json({ token });
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
