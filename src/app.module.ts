import { Module } from '@nestjs/common';
import { CategoriaModule } from './categoria/categoria.module';
import { FrecuenciaModule } from './frecuencia/frecuencia.module';
import { UsuarioModule } from './usuario/usuario.module';
import { GastoModule } from './gasto/gasto.module';
import { IngresoModule } from './ingreso/ingreso.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CategoriaModule, FrecuenciaModule, UsuarioModule, GastoModule, IngresoModule, AuthModule],
})
export class AppModule { }