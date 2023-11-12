import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'

export type ComppanyDocument = HydratedDocument<Comppany>

@Schema({ timestamps: true })
export class Comppany {
    @Prop({ required: true })
    name: string

    @Prop()
    address: string

    @Prop()
    description: string

    @Prop({ type: Object })
    createdBy: {
        _id: mongoose.Schema.Types.ObjectId
        email: string
    }

    @Prop({ type: Object })
    updatedBy: {
        _id: mongoose.Schema.Types.ObjectId
        email: string
    }

    @Prop({ type: Object })
    deletedBy: {
        _id: mongoose.Schema.Types.ObjectId
        email: string
    }

    @Prop()
    age: number

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
