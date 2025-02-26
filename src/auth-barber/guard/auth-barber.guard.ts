import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthBarberService } from '../auth-barber.service';
import { BarberService } from 'src/barbers/barber.service';

@Injectable()
export class AuthUserGuard implements CanActivate {
  constructor(
    private readonly authBarberService: AuthBarberService,
    private readonly barberService: BarberService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    const token = authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      const data = this.authBarberService.checkToken(token);
      const barberId = data.sub;

      const barber = await this.barberService.show(barberId);
      if (!barber) {
        throw new UnauthorizedException('Barber not found');
      }

      request.barber = barber;
      return true;
    } catch (e) {
      console.error('Authentication error:', e.message || e);
      throw new UnauthorizedException('Invalid token or barber');
    }
  }
}
