import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isFutureDate', async: false })
export class IsFutureDateConstraint implements ValidatorConstraintInterface {
  validate(dateString: any, _args: ValidationArguments) {
    if (!dateString) return false;
    
    const inputDate = new Date(dateString);
    const currentDate = new Date();

    if (isNaN(inputDate.getTime())) {
      return false;
    }

    currentDate.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);

    return inputDate >= currentDate;
  }

  defaultMessage(_args: ValidationArguments) {
    return 'A data do agendamento deve ser maior ou igual à data atual';
  }
}

export function IsFutureDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsFutureDateConstraint,
    });
  };
} 