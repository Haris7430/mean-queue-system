import dotenv from 'dotenv';
import express, { Application } from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import connectDB from './config/database'; 
import tokenRoutes from './routes/tokenRoutes';


dotenv.config();

// Initialize DB Connection immediately
connectDB(); 

const app: Application = express();

app.use(express.json());
app.use(cors());

const httpServer= http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT"]
    }
});

app.use((req,res,next)=> {
    (req as any).io= io;
    next();
});

app.use('/api/tokens', tokenRoutes)


app.get('/', (req, res) => {
  res.send('Queue System API Running');
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => console.log(` Server + socket running on port ${PORT}`));