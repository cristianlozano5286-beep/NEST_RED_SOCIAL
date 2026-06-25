import { Module } from '@nestjs/common';
import { PublicacionesController } from './publicacion.controller';
import { PublicacionesService } from './publicacion.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Publicacion, PublicacionSchema } from './schemas/publicaciones.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Publicacion.name,
                schema: PublicacionSchema,
            }
        ]),
    ],
    controllers: [PublicacionesController],
    providers: [PublicacionesService],
})
export class PublicacionesModule {}
