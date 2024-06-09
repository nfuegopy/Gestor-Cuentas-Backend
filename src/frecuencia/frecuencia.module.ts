import { Module } from '@nestjs/common';
import { FrecuenciaService } from './frecuencia.service';
import { FrecuenciaController } from './frecuencia.controller';

@Module({
  controllers: [FrecuenciaController],
  providers: [FrecuenciaService],
})
export class FrecuenciaModule { }
