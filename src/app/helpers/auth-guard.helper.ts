import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const isAuthenticated = sessionStorage.getItem('JWT_Token');
        if (isAuthenticated) {
            return true;
        }

        // Return user to home so he can log in
        this.router.navigate(['/home'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}