import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export const MAX_SANTIM = 10_000_000; // 100,000 ETB ceiling

@ValidatorConstraint({ name: 'isSantim', async: false })
export class IsSantimConstraint implements ValidatorConstraintInterface {
  validate(value: unknown): boolean {
    return (
      typeof value === 'number' &&
      Number.isInteger(value) &&
      value > 0 &&
      value <= MAX_SANTIM
    );
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must be a whole number of santim, between 1 and ${MAX_SANTIM} (100,000 ETB)`;
  }
}