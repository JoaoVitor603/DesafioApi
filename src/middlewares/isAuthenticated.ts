import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import ApiError from '../utils/apiError.utils';
import config from '../config/config';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
  admin: boolean;
}

export default function isAuthenticated(
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const decodedToken = verify(token, config.jwtSecret);

    const { sub, admin } = decodedToken as TokenPayload;

    request.user = {
      id: sub,
      // eslint-disable-next-line object-shorthand
      admin: admin,
    };

    return next();
  } catch {
    throw new ApiError(402, true, 'JWT Token is missing.');
  }
}
