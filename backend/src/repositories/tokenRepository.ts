import Token, {IToken} from '../models/Token';

class TokenRepository {
    async create(tokenNumber: string): Promise<IToken> {
        const token= new Token({tokenNumber})
        return await token.save();
    }

    async findAll(): Promise<IToken[]> {
        return await Token.find().sort({createdAt:1})
    }

    async findById(id:string) : Promise<IToken | null> {
        return await Token.findById(id)
    }
    
    async updateStatus(id:string, status:string): Promise<IToken | null> {
        return await Token.findByIdAndUpdate(id,
            {status},{new:true}
        )
    }
}

export default new TokenRepository()