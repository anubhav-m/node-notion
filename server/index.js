import express from 'express'
import cors from 'cors'
import { connectToDB } from './database/mongodb.js'
import { PORT, NODE_ENV } from './config/env.js'
import { authRouter } from './routes/auth.routes.js'

const app = express();

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Middleware to parse URL-encoded bodies


app.use('/api/auth', authRouter);


app.get('/', (req, res) => {
    res.send('Welcome to NodeNotion api')
});

(async () => {
    try {
        await connectToDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT} in ${NODE_ENV} mode`);
        });
    }
    catch (err) {
        console.error(`Failed to start server: ${err.message}`);
    }
})();