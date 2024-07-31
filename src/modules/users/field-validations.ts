import * as z from 'zod';

const name = z.string().min(4).max(16);
const score = z.number().min(0).max(10);


export {
    name as nameValidation,
    score as scoreValidation
};
