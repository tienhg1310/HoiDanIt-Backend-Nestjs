import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { Public } from 'src/decorator/customize'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './local-auth.guard'

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    handleLogin(@Request() req) {
        return this.authService.login(req.user)
    }

    // @Public()
    // @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user
    }
}
