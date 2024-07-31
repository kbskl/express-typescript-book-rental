import createError from 'http-errors';

const BadRequestException = createError.BadRequest;
const NotFoundException = createError.NotFound;


export {
    BadRequestException,
    NotFoundException,
};

export * from 'http-errors';
