import { NextFunction, Request, Response } from 'express';
import { BooksService } from './service';
import { NotFoundException } from '../../utils';


export class BooksController {
    static async all(req: Request, res: Response, next: NextFunction) {
        const books = await BooksService.all();
        res.json(books);
    }

    static async show(req: Request, res: Response, next: NextFunction) {
        const id = +req.params.id;

        const book = await BooksService.show(id);

        res.json(book);
    }

    static async store(req: Request, res: Response, next: NextFunction) {
        const payload = req.body;
        const book = await BooksService.store(payload);
        res.json(book);
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        const bookId = +req.params.id;

        const payload = req.body;

        const updatedBook = await BooksService.update(bookId, payload);

        res.json(updatedBook);
    }

    static async destroy(req: Request, res: Response, next: NextFunction) {
        const bookId = +req.params.id;
        const isDeleted = await BooksService.destroy(bookId);

        if (!isDeleted) {
            throw new NotFoundException('Book not found');
        }

        res.json({ message: 'Book deleted' });
    }
}


