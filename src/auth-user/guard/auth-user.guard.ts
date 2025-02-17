import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthUserService } from '../auth-user.service';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authUserService: AuthUserService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    const token = authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      const data = this.authUserService.checkToken(token);
      const userId = data.sub;

      const user = await this.userService.show(userId);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      request.user = user;
      return true;
    } catch (e) {
      console.error('Authentication error:', e.message || e);
      throw new UnauthorizedException('Invalid token or user');
    }
  }
}
