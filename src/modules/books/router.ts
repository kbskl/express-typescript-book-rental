import { Router } from 'express';
import { validateRequest } from '../../middlewares';
import { BooksController } from './controller';
import { bookCreationRequestSchema, bookDestroyRequestSchema, bookIndexRequestSchema, bookShowRequestSchema, bookUpdateRequestSchema } from './request-schemas';

const app = Router();

app.get('/', validateRequest(bookIndexRequestSchema), BooksController.all);
app.post('/', validateRequest(bookCreationRequestSchema), BooksController.store);
app.get('/:id', validateRequest(bookShowRequestSchema), BooksController.show);
app.put('/:id', validateRequest(bookUpdateRequestSchema), BooksController.update);
app.delete('/:id', validateRequest(bookDestroyRequestSchema), BooksController.destroy);

export {
    app as BooksRouter,
};
