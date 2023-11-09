import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type ComppanyDocument = HydratedDocument<Comppany>

@Schema({ timestamps: true })
export class Comppany {
    @Prop({ required: true })
    email: string

    @Prop({ required: true })
    password: string

    @Prop()
    name: string

    @Prop()
    phone: string

    @Prop()
    age: number

    @Prop()
    address: string

    @Prop()
    createdAt: Date

    @Prop()
    updatedAt: Date

    @Prop()
    isDeleted: boolean

    @Prop()
    deletedAt: Date
}

export const ComppanySchema = SchemaFactory.createForClass(Comppany)
