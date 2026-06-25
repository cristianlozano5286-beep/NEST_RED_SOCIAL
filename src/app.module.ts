import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config'; 
import { MongooseModule } from '@nestjs/mongoose';
import { RolesModule } from './modules/roles/roles.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { SeguidoresModule } from './modules/seguidores/seguidores.module'; 
import { PublicacionesModule } from './modules/publicaciones/publicacion.module'; 
import { ComentariosModule } from './modules/comentarios/comentarios.module'; // <-- Corregido a singular sin "s"
import { ReaccionesModule } from './modules/reacciones/reaccion.module';     // <-- Importación de Reacciones

@Module({
  imports: [
    // 1. Configuración global de variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    // 2. Todos tus módulos de interacciones acoplados en orden
    RolesModule,
    UsuariosModule,
    SeguidoresModule, 
    PublicacionesModule,
    ComentariosModule, 
    ReaccionesModule, 
    
    // 3. Conexión asíncrona a MongoDB Atlas / Local
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
export class AppModule {} // <-- Una sola clase al final del archivo