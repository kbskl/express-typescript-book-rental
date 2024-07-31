export interface UserDb {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface User extends Omit<UserDb, 'createdAt' | 'updatedAt'> {
    createdAt: Date;
    updatedAt: Date;
}

export interface UserRentalDb {
    bookId: number,
    bookName: string,
    rentalDate: Date,
    returnDate: Date,
    createdAt: Date;
    updatedAt: Date;
}

export interface UserRatingDb {
    bookId: number,
    bookName: string,
    rate: number,
    createdAt: Date;
    updatedAt: Date;
}


