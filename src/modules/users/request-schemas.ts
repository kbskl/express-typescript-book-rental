import * as z from 'zod';
import { nameValidation, scoreValidation } from './field-validations';
import { idValidation } from '../../utils';

export const userIndexRequestSchema = z.strictObject({
    
});

export const userShowRequestSchema = z.strictObject({
    params: z.strictObject({
        id: idValidation,
    }),
});

export const userUpdateRequestSchema = z.strictObject({
    params: z.strictObject({
        id: idValidation,
    }),
    body: z.strictObject({
        name: nameValidation.optional(),
    }),
});


export const userRegistrationRequestSchema = z.strictObject({
    body: z.strictObject({
        name: nameValidation,
    }),
});

export const userBorrowRequestSchema = z.strictObject({
    params: z.strictObject({
        id: idValidation,
        bookId:idValidation
    }),
});

export const userReturnRequestSchema = z.strictObject({
    params: z.strictObject({
        id: idValidation,
        bookId:idValidation
    }),
    body: z.strictObject({
        score: scoreValidation,
    }),
});


export const userDestroyRequestSchema = userShowRequestSchema;


export type UserUpdatePayload = z.infer<typeof userUpdateRequestSchema>['body'];

export type UserRegistrationPayload = z.infer<typeof userRegistrationRequestSchema>['body'];