import { Injectable } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const userData = await this.usersService.findOneByUsername(username)
        if (!userData) return null
        const checkPassword = await this.usersService.checkUserPassword(
            password,
            userData.password
        )
        if (checkPassword) return userData
    }
    async login(user: any) {
        const payload = { username: user.email, sub: user._id }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}
