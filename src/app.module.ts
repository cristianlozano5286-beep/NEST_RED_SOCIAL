import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config'; 
import { MongooseModule } from '@nestjs/mongoose';
import { RolesModule } from './modules/roles/roles.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';

@Module({
  imports: [
    // 1. Cargamos las variables de entorno de forma global
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    // 2. Módulos de tu aplicación (RolesModule solo una vez aquí)
    RolesModule,
    UsuariosModule,
    
    // 3. Cargamos Mongoose de forma asíncrona
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}