import { Books, Rentals, Rating } from '../../database';
import { BookCreatePayload, BookUpdatePayload } from './request-schemas';
import { NotFoundException } from '../../utils';
import { BookDb, BookRentlDb, BookRatingDb } from './types';

export const returningRentFields = ['users.id as userId', 'users.name as userName', 'returnDate', 'rentalDate', 'rentals.createdAt as createdAt', 'rentals.updatedAt as updatedAt']
export const returningRatingFields = ['users.id as userId', 'users.name as userName', 'rate', 'rating.createdAt as createdAt', 'rating.updatedAt as updatedAt']


class BooksService {
    async all() {
        let booksQuery = Books();
        const booksRaw: BookDb[] = await booksQuery;
        return booksRaw;
    }

    async show(id: number) {
        const bookRaw: BookDb = await Books().where({ id }).first();
        if (!bookRaw) {
            throw new NotFoundException('Book not found');
        }
        const rentInfo: BookRentlDb[] = await Rentals().where({ bookId: id }).join('users', 'rentals.userId', '=', 'users.id').select(returningRentFields)
        const ratingInfo: BookRatingDb[] = await Rating().where({ bookId: id }).join('users', 'rating.userId', '=', 'users.id').select(returningRatingFields)

        return { ...bookRaw, ...{ rentInfo }, ...{ ratingInfo } };
    }

    async store(payload: BookCreatePayload) {
        const [bookRaw]: [BookDb] = await Books().insert(payload).returning('*');
        return bookRaw!;
    }

    async update(id: number, payload: BookUpdatePayload) {
        await Books().where({ id }).update({ ...payload, updatedAt: new Date() });

        const updatedBookRaw: BookDb = await Books().where({ id }).first();

        if (!updatedBookRaw) {
            throw new NotFoundException('Book not found');
        }

        return updatedBookRaw;
    }

    async destroy(id: number) {
        const deletedBooksCount = await Books().where({ id }).delete();
        return deletedBooksCount === 1;
    }
}

const service = new BooksService();

export { service as BooksService };
