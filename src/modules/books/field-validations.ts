import * as z from 'zod';

const name = z.string().min(2).max(32);

export {
    name as nameValidation,
};
