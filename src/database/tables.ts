import { db } from './instance';

const Users = () => db('users');
const Books = () => db('books');
const Rentals = () => db('rentals');
const Rating = () => db('rating');

export {
    Users,
    Books,
    Rentals,
    Rating,
};
