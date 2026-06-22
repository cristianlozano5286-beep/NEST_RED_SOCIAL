import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RolesDocument, Role } from './schemas/roles.schema';
import { CreateRoleDto } from './dto/create-role.dto';
import { ResponseHelper } from '../../common/helpers/response.helper';
import { UpdateRoleDto } from './dto/update.role.dto';


@Injectable()
export class RolesService {
    constructor(
        @InjectModel(Role.name) 
        private readonly roleModel:
        Model<RolesDocument>,
    ) {}


/** 
 * metodo para crear un nuevo rol
 */
async createRole(
    dto: CreateRoleDto,
){
    const role = 
    await this.roleModel.create(dto);

    return ResponseHelper.success(
        role,
        201, 
        );
    }

    /**
     * metodo para consultar roles
     */

    async findAll(){
        const roles = await this.roleModel.find({activo: true});
        return ResponseHelper.success(
            roles,
        );
    }
    /**
     * consulta roles eliminados logicamente
     */
    async findInactive(){
        const roles = await this.roleModel.find({activo: false});
        return ResponseHelper.success(roles,);
    }


    /**
     * buscar un rol por id
     */
    async findByid(id: string){
        const role = await this.roleModel.findById(id);

        if(!role){
            throw new NotFoundException('rol no encontrado');

        }
        return ResponseHelper.success(role);
    }

    /**
     * Actializar compeltamente un rol
     */
    async update(id: string, dto: UpdateRoleDto){
        const role = await  this.roleModel.findByIdAndUpdate(id);
        if(!role){
            throw new NotFoundException('rol no encontrado');
        }
        const updateRole = await this.roleModel.findByIdAndUpdate(id, dto, {new: true});
        return ResponseHelper.success(updateRole);
    }

    /**
     * actualizacion parcial
     */
    async partialUpdate(id: string, dto: UpdateRoleDto){
        const role = await this.roleModel.findByIdAndUpdate(id);
        if(!role){
            throw new NotFoundException('rol no encontrado');
        }
        const updateRole = await this.roleModel.findByIdAndUpdate(id, {$set: dto,},{new: true});
        return ResponseHelper.success(updateRole);
    }

    /**
     * eliminar un rol
     */
    async remove(id: string){
        const role = await this.roleModel.findById(id);
        if(!role){
            throw new NotFoundException('rol no encontrado');

        }
        const deleteRole = await this.roleModel.findByIdAndUpdate(id,{activo: false,},{new: true,});
        return ResponseHelper.success(deleteRole);
    }

    /**
     * resaturar rol eliminado 
     */
    async restore(id: string){
        const role = await this.roleModel.findById(id);
        if(!role){
            throw new NotFoundException('rol no encontrado');
        }
        const restoreRole = await this.roleModel.findByIdAndUpdate(id,{activo: true,},{new: true,});
        return ResponseHelper.success(restoreRole);

        }

    }
