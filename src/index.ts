import 'dotenv/config';
import express, { NextFunction, Request, Response, Router } from 'express';
import 'express-async-errors';
import { HttpError } from 'http-errors';
import { UserRouter } from './modules/users';
import { BooksRouter } from './modules/books';
import * as process from 'process';


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json() as any);

const api = Router();

api.get('/', (req, res) => {
    res.json({ message: 'Hi there! Use postman collection :)' });
});


api.use('/users', UserRouter);
api.use('/books', BooksRouter);

app.use('', api);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (!(err instanceof HttpError)) return void next(err);

    res.statusCode = err.statusCode;
    res.json({ message: err.message });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
