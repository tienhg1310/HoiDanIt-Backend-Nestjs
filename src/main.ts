import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'
import { JwtAuthGuard } from './auth/jwt-auth.guard'
import { TransformInterceptor } from './core/transform.interceptor'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const configService = app.get(ConfigService)
    const port = configService.get<string>('PORT')

    const reflector = app.get(Reflector)
    app.useGlobalGuards(new JwtAuthGuard(reflector))

    // interceptor config
    app.useGlobalInterceptors(new TransformInterceptor())

    app.useGlobalPipes(new ValidationPipe())
    app.enableCors({
        origin: 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204
    })
    await app.listen(port)
}
bootstrap()
