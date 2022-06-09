import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import ApiError from '../utils/apiError.utils';
import config from '../config/config';

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
    throw new ApiError(402, true, 'JWT Token is missing.');
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
    throw new ApiError(402, true, '');
  } catch {
    throw new ApiError(402, true, 'User is not admin.');
  }
}
