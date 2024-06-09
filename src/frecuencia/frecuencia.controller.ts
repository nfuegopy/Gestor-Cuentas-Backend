import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { FrecuenciaService } from './frecuencia.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('frecuencia')
export class FrecuenciaController {
    constructor(private readonly frecuenciaService: FrecuenciaService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async addFrecuencia(@Body('descripcion') descripcion: string) {
        await this.frecuenciaService.addFrecuencia(descripcion);
        return { message: 'Frecuencia added successfully' };
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getFrecuencias() {
        return this.frecuenciaService.getFrecuencias();
    }
}
