import { Controller, Get, Post, Body, Param, Patch, Delete, Put } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';
import { UpdateRoleDto } from './dto/update.role.dto';
import { ResponseHelper } from '../../common/helpers/response.helper';





@Controller('roles')
export class RolesController {
    constructor(
        private readonly service:
        RolesService,
    ) {}
    /**
     * metodo para crear un nuevo rol
     */
    @Post()
    create(
        @Body()
        dto: CreateRoleDto,
    ){
        return this.service.createRole(dto);
    }
    /**
     * metodo para consultar roles
     */


    @Get()
    findAll(){
        return this.service.findAll();
    }
     /**
     * consultar roles inactivos
     */
    @Get('inactivos')
    findInactive(){
        return this.service.findInactive();
    }

    /**
     * buscar un rol por id
     */
    @Get(':id')
    findByid(
        @Param('id')
        id: string,
    ){
        return this.service.findByid(id);
    }

    /**
     * actualizar rol
     */

    @Put(':id')
    update(
        @Param('id')
        id: string,

        @Body()
        dto: UpdateRoleDto,
    ){
        return this.service.update(
            id, dto);
    }

    /**
     * actualizacion parcial
     */
    @Patch(':id')
    partialUpdate(
        @Param('id')
        id: string,
        @Body()
        dto: UpdateRoleDto,
    ){
        return this.service.partialUpdate(id, dto);
    }

    /** 
     * resaturar rol eliminado
     */
    @Patch(':id/resturar')
    restore(
        @Param('id')
        id: string,
    ){
        return this.service.restore(id);
    }
    
    /**
     * eliminacion logica 
     */
    @Delete(':id')
    remove(
        @Param('id')
        id: string,
        ){
        return this.service.remove(id);
        }
    
    /**
     * consultar roles inactivos
     */
 }
