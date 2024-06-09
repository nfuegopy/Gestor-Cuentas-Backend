import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() body) {
        const { email, password } = body;
        const result = await this.authService.login(email, password);
        return result;
    }

    @Post('register')
    async register(@Body() body) {
        const { email, password } = body;
        return this.authService.register(email, password);
    }

    @Post('google-login')
    async googleLogin(@Body('idToken') idToken: string) {
        return this.authService.googleLogin(idToken);
    }

    @UseGuards(JwtAuthGuard)
    @Post('profile')
    getProfile(@Req() req) {
        return req.user;
    }
}
