import {Request,Response} from 'express';
import tokenRepository from '../repositories/tokenRepository';

class TokenController {
    async createToken(req:Request, res:Response): Promise<void> {
        try{
            const {tokenNumber}= req.body;
            const finalToken= tokenNumber || `T-${Date.now().toString().slice(-4)}`;

            const newToken= await tokenRepository.create(finalToken);
            const io= (req as any).io;
            io.emit('token_created', newToken)
            res.status(201).json(newToken);
        } catch (error) {
            res.status(500).json({message: (error as Error).message})
        }
    };

    async getAllTokens(req:Request, res:Response): Promise<void> {
        try {
            const tokens= await tokenRepository.findAll();
            res.status(200).json(tokens)
        } catch(error) {
            res.status(500).json({message:(error as Error).message})
        }
    };

    async updateStatus(req:Request, res:Response): Promise<void> {
        try {
            const {id}= req.params;
            const {status}= req.body;

            if (!id) {
             res.status(400).json({ message: "ID parameter is missing" });
             return
                }

            const updateToken= await tokenRepository.updateStatus(id,status);

            if(!updateToken) {
                res.status(404).json({message:'Token Not found'})
                return
            }

            const io= (req as any).io;
            io.emit('token_updated', updateToken)
            res.status(200).json(updateToken)
        } catch(error) {
            res.status(500).json({message:(error as Error).message})
        };
    };


}

export default new TokenController()