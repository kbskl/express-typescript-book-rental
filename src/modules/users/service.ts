import { Rentals, Users, Rating } from '../../database';
import { UserUpdatePayload, UserRegistrationPayload } from './request-schemas';
import { NotFoundException, BadRequestException } from '../../utils';
import { UserDb, UserRentalDb, UserRatingDb } from './types';
import { BooksService } from '../books/service';

export const returningUserFields = ['id', 'name', 'createdAt', 'updatedAt'];
export const returningRentalFields = ['books.id as bookId', 'books.name as bookName', 'returnDate', 'rentalDate', 'rentals.createdAt as createdAt', 'rentals.updatedAt as updatedAt']
export const returningRatingFields = ['books.id as bookId', 'books.name as bookName', 'rate', 'rating.createdAt as createdAt', 'rating.updatedAt as updatedAt']

class UsersService {
    async all() {
        let query = Users().select(returningUserFields);
        const usersRaw: UserDb[] = await query;
        return usersRaw;
    }

    async show(id: number) {
        const userRaw: UserDb = await Users().where({ id }).select(returningUserFields).first();
        if (!userRaw) {
            throw new NotFoundException('User not found');
        }
        const rentalInfo: UserRentalDb[] = await Rentals().where({ userId: id }).join('books', 'rentals.bookId', '=', 'books.id').select(returningRentalFields)
        const ratingInfo: UserRatingDb[] = await Rating().where({ userId: id }).join('books', 'rating.bookId', '=', 'books.id').select(returningRatingFields)

        return { ...userRaw, ...{ rentalInfo }, ...{ ratingInfo } };
    }

    async store(payloadRaw: UserRegistrationPayload) {
        const [userRaw]: [UserDb] = await Users().insert(payloadRaw).returning(returningUserFields);

        return userRaw!;
    }

    async update(id: number, payloadRaw: UserUpdatePayload) {
        await Users().where({ id }).update({ ...payloadRaw, updatedAt: new Date() });
        const updatedUserRaw: UserDb = await Users().where({ id }).select(returningUserFields).first();
        if (!updatedUserRaw) {
            throw new NotFoundException('User not found');
        }
        return updatedUserRaw;
    }

    async destroy(id: number) {
        const deletedUsersCount = await Users().where({ id }).delete();
        return deletedUsersCount === 1;
    }

    async borrow(id: number, bookId: number) {
        const user = await this.show(id)
        const book = await BooksService.show(bookId);
        const activeRentalRecord = book.rentInfo.filter(rentInfo => !rentInfo.returnDate)
        if (activeRentalRecord.length > 0) {
            throw new BadRequestException('The book is still on rent');
        }
        const payload = {
            userId: id,
            bookId: bookId,
            rentalDate: new Date()
        }
        await Rentals().insert(payload)
    }

    async return(id: number, bookId: number, score: number) {
        const user = await this.show(id)
        const book = await BooksService.show(bookId);
        const activeRentalRecord = book.rentInfo.filter(rentInfo => !rentInfo.returnDate)
        if (activeRentalRecord.length == 0) {
            throw new BadRequestException('The book is not rented by anyone');
        }
        const [activeRecord] = activeRentalRecord
        if (activeRecord.userId !== id) {
            throw new BadRequestException('The book has been rented by another user');
        }
        const rentalPayload = {
            returnDate: new Date()
        }
        await Rentals().where({ userId: id, bookId: bookId, returnDate: null }).update({ ...rentalPayload, updatedAt: new Date() });

        const ratingPayload = {
            userId: id,
            bookId: bookId,
            rate: score
        }
        await Rating().insert(ratingPayload)

    }

}

const service = new UsersService();

export { service as UsersService };
