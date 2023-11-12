import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose'
import { IUser } from 'src/users/users.interface'
import { CreateCompanyDto } from './dto/create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'
import { Comppany, ComppanyDocument } from './schema/company.schema'
import mongoose from 'mongoose'
import { ConfigService } from '@nestjs/config'
import ms from 'ms'
import { IPagePanigation } from './companies.interface'
import aqp from 'api-query-params'

@Injectable()
export class CompaniesService {
    constructor(
        @InjectModel(Comppany.name)
        private companyModel: SoftDeleteModel<ComppanyDocument>,
        private configService: ConfigService
    ) {}

    async create(createCompanyDto: CreateCompanyDto, user: IUser) {
        try {
            let result = await this.companyModel.create({
                ...createCompanyDto,
                createdBy: {
                    _id: user._id,
                    email: user.email
                }
            })
            return {
                success: 201,
                message: 'Create company success',
                result
            }
        } catch (error) {
            return error
        }
    }

    async updateCompany(id: string, updateCompanyDto: UpdateCompanyDto, user: IUser) {
        console.log(ms(this.configService.get('JWT_ACCESS_EXPIRE')))
        const result = await this.companyModel.updateOne(
            { _id: new mongoose.Types.ObjectId(id) },
            {
                ...updateCompanyDto,
                updatedBy: { _id: user._id, email: user.email }
            }
        )
        return {
            result
        }
    }

    async deleteCompany(id: string, user: IUser) {
        await this.companyModel.updateOne(
            { _id: id },
            {
                deletedBy: {
                    _id: user._id,
                    email: user.email
                }
            }
        )
        try {
            const result = await this.companyModel.softDelete({ _id: id })
            console.log(result)
            return {
                success: 200,
                message: 'Delete company success',
                result
            }
        } catch (error) {
            return {
                message: error.message,
                error
            }
        }

        return
    }
    async getAllCompanies(qs: string) {
        const { filter, limit, sort, population } = aqp(qs)
        const currentPage = filter.page
        delete filter.page

        console.log(currentPage)
        let offset = (currentPage - 1) * limit
        let defaultLimit = limit ? limit : 10

        const totalItems = (await this.companyModel.find(filter)).length
        const totalPages = Math.ceil(totalItems / defaultLimit)

        const result = await this.companyModel
            .find(filter)
            .skip(offset)
            .limit(defaultLimit)
            .sort(sort as any)
            .populate(population)
            .exec()

        return {
            meta: {
                page: currentPage,
                limit: limit,
                totalItems: totalItems,
                totalPages: totalPages
            },
            result
        }
    }
}
