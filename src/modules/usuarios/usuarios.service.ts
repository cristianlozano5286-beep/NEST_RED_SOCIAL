import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { BadRequestException , NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ResponseHelper } from "src/common/helpers/response.helper";
import { SearchUserDto } from './dto/search-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
 export class UsuariosService {
    constructor(@InjectModel(User.name)
        private readonly userModel: Model<UserDocument>
    ){}


    /**
  * metodo para creacion de usuarios
  */

    async create(dto: CreateUserDto){
    // 1. Verificación de correo
    const exists = await this.userModel.findOne({ correo: dto.correo });
    
    // 2. SI EXISTE, retornar error (¡Aquí faltaba el IF!)
    if (exists) {
        throw new BadRequestException('el correo ya existe');
    }

    // 3. Si no existe, continúa el flujo normal
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.userModel.create({
        ...dto,
        password: hashedPassword
    });
    
    return ResponseHelper.success(user, 201);
}

    /**
     *  consultar usuarios
     */

    async findAll(serach: SearchUserDto){
        // crear filtros
        const filter: any = { activo: true};

        // filtro nombre
        if(serach.nombre){
            filter.nombre = { 
                $regex: serach.nombre,
                $options: 'i'
            };

        }
        const page = Number(serach.page) || 1;
        const limit = Number(serach.limit) || 10;

        // consultar
        const data = await this.userModel.find(filter).populate('rol_id').skip((page-1)*limit).limit(limit);
        // contador de documentos = constador de usuarios
        const total = await this.userModel.countDocuments(filter);

        return ResponseHelper.success({data, total});
    }

    /**
     * consultar por id de usuario
     */

    async findOne(id: string){
        const user = await this.userModel.findById(id).populate('rol_id');

        if (!user){ 
            throw new NotFoundException('usuario no encontrado');
           
    }
    return ResponseHelper.success(user);

  }

  /**
   * actualizacion de horario
   */

  async update(id: string, dto: UpdateUserDto){
    const user = await this.userModel.findById(id);

    if (!user){
        throw new NotFoundException('no se encontro el usuario');
    }

    if (dto.password){
        dto.password = await bcrypt.hash(dto.password,10);
    }

    const updateuser = await this.userModel.findByIdAndUpdate(id,  {new: true});

    return ResponseHelper.success(updateuser);


  }

  /** 
   * SOF DELETE
   */

  async remove(id: string){
    const user = await this.userModel.findById(id);
    if (!user){
        throw new NotFoundException('usuario no encontrado');
       

    }
    const deletedUser = await this.userModel.findByIdAndUpdate(id, {activo: false});
    
    return ResponseHelper.success(deletedUser);
  }


}
