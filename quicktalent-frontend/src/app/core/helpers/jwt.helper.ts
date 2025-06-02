// src/app/core/helpers/jwt.helper.ts

import { jwtDecode } from 'jwt-decode';

export interface JwtPayload {
  sub: string;
  roles: string[];  // ou selon la structure de votre JWT
  exp: number;
  iat: number;
}

export function decodeToken(token: string): JwtPayload | null {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (e) {
    return null;
  }
}
