export interface BookDb {
    id: number;
    title: string;
    author: string;
    createdAt: string;
    updatedAt: string;
}

export interface Book extends Omit<BookDb, 'createdAt' | 'updatedAt'> {
    createdAt: Date;
    updatedAt: Date;
}

export interface BookRentlDb {
    userId: number,
    userName: string,
    rentalDate: Date,
    returnDate: Date,
    createdAt: Date;
    updatedAt: Date;
}

export interface BookRatingDb {
    userId: number,
    userName: string,
    rate: number,
    createdAt: Date;
    updatedAt: Date;
}
