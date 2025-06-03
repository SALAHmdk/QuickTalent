// src/app/core/guards/role.guard.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../services/auth.service';

interface JwtPayload {
  sub: string;
  roles: string[];
  exp: number;
  iat: number;
}

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    let payload: JwtPayload;
    try {
      payload = jwtDecode<JwtPayload>(token);
    } catch {
      this.router.navigate(['/auth/login']);
      return false;
    }

    const allowedRoles: string[] = route.data['roles'];
    const hasRole = payload.roles.some(r => allowedRoles.includes(r));
    if (!hasRole) {
      this.router.navigate(['/auth/login']);
    }
    return hasRole;
  }
}
