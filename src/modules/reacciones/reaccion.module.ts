import { Module } from '@nestjs/common';
import { ReaccionesController } from './reaccion.controller';
import { ReaccionesService } from './reaccion.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Reaccion, ReaccionSchema } from './schemas/reaccion.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Reaccion.name,
                schema: ReaccionSchema,
            }
        ]),
    ],
    controllers: [ReaccionesController],
    providers: [ReaccionesService],
})
export class ReaccionesModule {}
