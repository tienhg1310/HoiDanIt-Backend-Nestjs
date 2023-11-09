import { IsEmail, IsNotEmpty } from 'class-validator'

export class CreateUserDto {
    @IsEmail({}, { message: 'Email Khong dung dinh dang' })
    @IsNotEmpty({ message: 'Email not empty' })
    email: string

    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    name: string
}
