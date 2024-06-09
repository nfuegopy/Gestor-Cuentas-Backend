import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { GastoService } from './gasto.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('gasto')
export class GastoController {
  constructor(private readonly gastoService: GastoService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async addGasto(
    @Body('usuarioId') usuarioId: string,
    @Body('categoriaId') categoriaId: string,
    @Body('frecuenciaId') frecuenciaId: string,
    @Body('fecha') fecha: string,
    @Body('monto') monto: number,
    @Body('notas') notas: string,
  ) {
    await this.gastoService.addGasto(usuarioId, categoriaId, frecuenciaId, fecha, monto, notas);
    return { message: 'Gasto added successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getGastos() {
    return this.gastoService.getGastos();
  }
}
