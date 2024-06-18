import jwt from 'jsonwebtoken';

const secret = 'your_jwt_secret';

export const createToken = (user) => {
  return jwt.sign({ id: user._id }, secret, {
    expiresIn: '1d',
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, secret);
};
