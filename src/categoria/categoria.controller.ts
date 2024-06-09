import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('categoria')
export class CategoriaController {
    constructor(private readonly categoriaService: CategoriaService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async addCategoria(@Body('nombre') nombre: string, @Body('tipo') tipo: string) {
        await this.categoriaService.addCategoria(nombre, tipo);
        return { message: 'Categoria added successfully' };
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getCategorias() {
        return this.categoriaService.getCategorias();
    }
}
