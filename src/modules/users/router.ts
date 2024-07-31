import { Router } from 'express';
import { UsersController } from './controller';
import { validateRequest } from '../../middlewares';
import { userDestroyRequestSchema, userReturnRequestSchema ,userIndexRequestSchema, userShowRequestSchema, userUpdateRequestSchema, userRegistrationRequestSchema, userBorrowRequestSchema } from './request-schemas';


const app = Router();

app.get('/', validateRequest(userIndexRequestSchema), UsersController.all);
app.post('/', validateRequest(userRegistrationRequestSchema), UsersController.create);
app.get('/:id', validateRequest(userShowRequestSchema), UsersController.show);
app.put('/:id', validateRequest(userUpdateRequestSchema), UsersController.update);
app.delete('/:id', validateRequest(userDestroyRequestSchema), UsersController.destroy);
app.post('/:id/borrow/:bookId', validateRequest(userBorrowRequestSchema), UsersController.borrow);
app.post('/:id/return/:bookId', validateRequest(userReturnRequestSchema), UsersController.return);

export {
    app as UserRouter,
};
