import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from 'resources/auth/auth.service';

@Injectable()
export class OptionnalAuthGuard implements CanActivate {
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
            return true;
        }

        const { authorization } = headers;

        if (!authorization) {
            return true
        }

        const token = authorization.replaceAll('Bearer ', '');

        const user = await this.authService.getUserFromToken(token);

        if (user) {
            request.user = user;
        }

        return true;
    }
}
