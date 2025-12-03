import mongoose, {Schema,Document} from "mongoose";


export interface IToken extends Document {
    tokenNumber: number;
    customerName?: string;
    status: 'PENDING' | 'SERVING' | 'COMPLETED' | 'CANCELLED';
    CreatedAt: Date;
    updatedAt: Date;
}

const TokenSchema: Schema = new Schema (
    {
        tokenNumber: {
            type: String,
            required:true,
            unique:true
        },
        status: {
            type: String,
            enum: ['PENDING','SERVING','COMPLETED','CANCELLED'],
            default:'PENDING'
        }
    },
    {
        timestamps:true
    }
)


export default mongoose.model<IToken>('Token', TokenSchema)