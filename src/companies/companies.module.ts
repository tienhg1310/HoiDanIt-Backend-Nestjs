import { Module } from '@nestjs/common'
import { CompaniesService } from './companies.service'
import { CompaniesController } from './companies.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Comppany, ComppanySchema } from './schema/company.schema'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Comppany.name, schema: ComppanySchema }
        ])
    ],
    controllers: [CompaniesController],
    providers: [CompaniesService]
})
export class CompaniesModule {}
