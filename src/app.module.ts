import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { softDeletePlugin } from 'soft-delete-plugin-mongoose'
import { CompaniesModule } from './companies/companies.module'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('MONGODB_URI'),
                connectionFactory: (connection) => {
                    connection.plugin(softDeletePlugin)
                    return connection
                }
            }),
            inject: [ConfigService]
        }),
        UsersModule,
        AuthModule,
        CompaniesModule
    ],

    providers: [AppService]
})
export class AppModule {}
