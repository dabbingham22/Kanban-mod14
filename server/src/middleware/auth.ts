import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  const authHeader = req.headers.authorization; //get the auth header from the request made

  //if auth header is there then split to get token
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    //retrieve JWT key
    const secretKey = process.env.JWT_SECRET_KEY || '';

    //verify JST token using the secret key to do so
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user as JwtPayload;
      return next();
    });
  } else {
    console.log(authHeader)
    res.sendStatus(401);
  }
};
