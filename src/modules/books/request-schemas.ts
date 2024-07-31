import * as z from 'zod';
import { nameValidation } from './field-validations';
import { idValidation } from '../../utils';

export const bookIndexRequestSchema = z.strictObject({
    
});

export const bookShowRequestSchema = z.strictObject({
    params: z.strictObject({
        id: idValidation,
    }),
});

export const bookCreationRequestSchema = z.strictObject({
    body: z.strictObject({
        name: nameValidation,
    }),
});

export const bookUpdateRequestSchema = z.strictObject({
    params: z.strictObject({
        id: idValidation,
    }),
    body: z.strictObject({
        name: nameValidation.optional(),
    }),
});

export const bookDestroyRequestSchema = z.strictObject({
    params: z.strictObject({
        id: idValidation,
    }),
});


export type BookCreatePayload = z.infer<typeof bookCreationRequestSchema>['body'];
export type BookUpdatePayload = z.infer<typeof bookUpdateRequestSchema>['body'];
