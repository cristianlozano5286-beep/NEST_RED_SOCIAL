import { PartialType } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';

/**
 * dto para actualizar un rol
 * partialtype convierte todas las propiedades
 * creareroledto campos opcionales
 */

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}