import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@/config/authConfig';
import { AppError } from '../errors/AppError';

interface TokenPayload {
  iat: string;
  exp: string;
  sub: string;
}

export async function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('jwt token not provided');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    req.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid jwt');
  }
}
