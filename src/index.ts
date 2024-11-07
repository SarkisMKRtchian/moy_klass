import 'dotenv/config';
import express from 'express';
import sequelize from "./database";
import "./models";

import router from './routes';
import errorHandler from './middleware/ErrorHandlingMiddleware';
import bodyParser from 'body-parser';

const PROT = process.env.PORT || 5050;
const app = express();


app.use(bodyParser.json());

app.use('/api', router);

app.use(errorHandler);

const connectDb = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

connectDb();

app.listen(PROT, () => {
    console.log(`Server is running on port ${PROT}`);
})