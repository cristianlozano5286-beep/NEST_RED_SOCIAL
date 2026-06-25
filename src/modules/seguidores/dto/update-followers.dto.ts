import { PartialType } from '@nestjs/swagger';
import { CreateSeguidorDto } from './create-followers.dto';

/**
 * DTO para actualizar un seguidor
 * PartialType
 */

export class UpdateSeguidorDto extends PartialType(
    CreateSeguidorDto
) {}
