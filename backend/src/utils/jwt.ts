import jwt from 'jsonwebtoken';

export interface JwtPayload {
  userId: number;
  email: string;
}

export const generateAccessToken = (userId: number, email: string): string => {
  return jwt.sign({ userId, email }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '15m',
  });
};

export const generateRefreshToken = (userId: number, email: string): string => {
  return jwt.sign({ userId, email }, process.env.JWT_REFRESH_SECRET || 'refresh-secret', {
    expiresIn: '7d',
  });
};

export const verifyAccessToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as JwtPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};

export const verifyRefreshToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET || 'refresh-secret') as JwtPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};
