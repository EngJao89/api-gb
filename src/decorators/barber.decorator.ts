import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { BarberData } from 'src/interfaces/barber.interface';

export const Barber = createParamDecorator(
  (
    filter: keyof BarberData | Array<keyof BarberData> | undefined,
    context: ExecutionContext,
  ): any => {
    const request = context.switchToHttp().getRequest();

    if (!request.barber) {
      throw new NotFoundException(
        'Barber not found. Ensure AuthBarberGuard is applied.',
      );
    }

    const barber = request.barber;

    if (filter) {
      if (Array.isArray(filter)) {
        return filter.reduce((result, key) => {
          if (key in barber) {
            result[key] = barber[key];
          }
          return result;
        }, {} as Partial<BarberData>);
      }

      return barber[filter];
    }

    return barber;
  },
);
