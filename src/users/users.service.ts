import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './schemas/user.schema'
import { InjectModel } from '@nestjs/mongoose'
import mongoose, { Model } from 'mongoose'
import { genSaltSync, hashSync } from 'bcryptjs'

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    hashPassword = (pasword: string) => {
        const salt = genSaltSync(10)
        const hash = hashSync(pasword, salt)
        return hash
    }

    async create(createUserDto: CreateUserDto) {
        const hashPassword = this.hashPassword(createUserDto.password)
        let userData = await this.userModel.create({
            email: createUserDto.email,
            password: hashPassword,
            name: createUserDto.name
        })
        return userData
    }

    async findAll() {
        const resData = await this.userModel.find({})
        return resData
    }

    async findOne(id: string) {
        const isObjectId = mongoose.isValidObjectId(id)
        if (isObjectId) {
            return await this.userModel.findOne({ _id: id })
        }
        return {
            error: 400,
            message: 'Error Id!!!'
        }
    }

    async update(updateUserDto: UpdateUserDto) {
        return await this.userModel.updateOne(
            { _id: updateUserDto._id },
            { ...updateUserDto }
        )
    }

    async remove(id: string) {
        const isObjectId = mongoose.isValidObjectId(id)
        if (!isObjectId) {
            return {
                error: 400,
                message: 'Error Id!!!'
            }
        }
        return await this.userModel.deleteOne({ _id: id })
    }
}
