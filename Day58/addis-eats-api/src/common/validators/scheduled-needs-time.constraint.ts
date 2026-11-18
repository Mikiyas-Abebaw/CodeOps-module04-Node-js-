import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'scheduledNeedsTime', async: false })
export class ScheduledNeedsTime implements ValidatorConstraintInterface {
  validate(scheduledFor: unknown, args: ValidationArguments): boolean {
    const dto = args.object as { isScheduled?: boolean };
    if (!dto.isScheduled) return true; // rule does not apply
    return scheduledFor instanceof Date && scheduledFor > new Date();
  }

  defaultMessage(): string {
    return 'scheduledFor must be a future time when isScheduled is true';
  }
}