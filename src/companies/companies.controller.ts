import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { User } from 'src/decorator/customize'
import { IUser } from 'src/users/users.interface'
import { CompaniesService } from './companies.service'
import { CreateCompanyDto } from './dto/create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'
import { IPagePanigation } from './companies.interface'
import aqp from 'api-query-params'

@Controller('companies')
export class CompaniesController {
    constructor(private readonly companiesService: CompaniesService) {}

    @Post()
    create(@Body() createCompanyDto: CreateCompanyDto, @User() user: IUser) {
        return this.companiesService.create(createCompanyDto, user)
    }

    @Patch(':id')
    updateCompany(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto, @User() user: IUser) {
        return this.companiesService.updateCompany(id, updateCompanyDto, user)
    }

    @Delete(':id')
    deleteCompany(@Param('id') id: string, @User() user: IUser) {
        return this.companiesService.deleteCompany(id, user)
    }

    @Get()
    getAllCompanies(@Query() param: string) {
        const resData = this.companiesService.getAllCompanies(param)
        return resData
    }
}
