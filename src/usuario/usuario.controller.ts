import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async addUsuario(@Body('nombre') nombre: string, @Body('correo') correo: string) {
        await this.usuarioService.addUsuario(nombre, correo);
        return { message: 'Usuario added successfully' };
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getUsuarios() {
        return this.usuarioService.getUsuarios();
    }
}
