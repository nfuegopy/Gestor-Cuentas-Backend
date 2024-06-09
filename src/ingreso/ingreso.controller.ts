import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { IngresoService } from './ingreso.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('ingreso')
export class IngresoController {
    constructor(private readonly ingresoService: IngresoService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async addIngreso(
        @Body('usuarioId') usuarioId: string,
        @Body('categoriaId') categoriaId: string,
        @Body('fecha') fecha: string,
        @Body('monto') monto: number,
        @Body('notas') notas: string,
    ) {
        await this.ingresoService.addIngreso(usuarioId, categoriaId, fecha, monto, notas);
        return { message: 'Ingreso added successfully' };
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getIngresos() {
        return this.ingresoService.getIngresos();
    }
}
