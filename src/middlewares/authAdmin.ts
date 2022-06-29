import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import config from '../config/config';
import AppError from '../utils/AppError';

interface TokenPayload {
  admin: boolean;
  sub: string;
}

export default function isAdmin(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing', StatusCodes.UNAUTHORIZED);
  }
  // Bearer sdlkfjsldkfjlsjfffdklfjdflksjflkjfdlk3405905
  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, config.jwtSecret);

    const { sub, admin } = decodedToken as TokenPayload;

    request.user = {
      id: sub,
      // eslint-disable-next-line object-shorthand
      admin: admin,
    };

    if (request.user.admin === true) {
      return next();
    }
    // Sem a esse api error a requisição fica sendo enviada sempre
    throw new AppError('', StatusCodes.UNAUTHORIZED);
  } catch {
    throw new AppError('User is not admin', StatusCodes.UNAUTHORIZED);
  }
}
