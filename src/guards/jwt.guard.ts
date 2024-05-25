import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from 'resources/auth/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
    ) { }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();

        const { headers } = request;

        if (!headers) {
            return false;
        }

        const { authorization } = headers;

        if (!authorization) {
            return false
        }

        const token = authorization.replaceAll('Bearer ', '');

        const user = await this.authService.getUserFromToken(token);

        if (user) {
            request.user = user;
        }

        return !!user;
    }
}
