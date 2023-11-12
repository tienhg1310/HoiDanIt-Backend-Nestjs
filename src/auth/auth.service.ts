import { Injectable } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { JwtService } from '@nestjs/jwt'
import { IUser } from 'src/users/users.interface'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(username: string, password: string): Promise<any> {
        const userData = await this.usersService.findOneByUsername(username)
        if (!userData) return null
        const checkPassword = await this.usersService.checkUserPassword(password, userData.password)
        if (checkPassword) return userData
    }
    async login(user: IUser) {
        const { _id, name, email, role } = user
        const payload = {
            sub: 'token login',
            iss: 'from server',
            _id,
            name,
            email,
            role
        }
        return {
            access_token: this.jwtService.sign(payload),
            _id,
            name,
            email,
            role
        }
    }
}
