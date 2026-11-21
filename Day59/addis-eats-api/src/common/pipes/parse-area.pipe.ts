import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { AREAS } from '../../restaurants/restaurants.type';
import type { Area } from '../../restaurants/restaurants.type';

@Injectable()
export class ParseAreaPipe
  implements PipeTransform<unknown, Area | undefined>
{
  transform(value: unknown, metadata: ArgumentMetadata): Area | undefined {
    // an optional filter that was not sent: nothing to normalise
    if (value === undefined) return undefined;

    const message = `${metadata.data} must be one of: ${AREAS.join(', ')}`;
    if (typeof value !== 'string') throw new BadRequestException(message);

    // match case-insensitively, then return the canonical spelling from AREAS
    const match = AREAS.find(
      (area) => area.toLowerCase() === value.trim().toLowerCase(),
    );
    if (!match) throw new BadRequestException(message);

    return match;
  }
}