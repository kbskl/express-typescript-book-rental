import { NextFunction, Request, Response } from 'express';
import { UsersService } from './service';
import { Users } from '../../database';
import { NotFoundException, BadRequestException } from '../../utils';


export class UsersController {
    static async all(req: Request, res: Response, next: NextFunction) {
        const users = await UsersService.all();

        res.json(users);
    }

    static async create(req: Request, res: Response, next: NextFunction) {

        const name = req.body.name.toLocaleLowerCase();

        const existingUser = await Users().where('name', name).first();

        if (existingUser) {
            throw new BadRequestException('Username already taken');
        }

        const user = await UsersService.store(req.body);
        const response = {
            user
        };

        res.json(response);
    }

    static async show(req: Request, res: Response, next: NextFunction) {
        const id = +req.params.id;

        const user = await UsersService.show(id);

        res.json(user);
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        const id = +req.params.id;

        const payload = req.body;
        const lang = req.acceptsLanguages()[0].replace('*', '') || 'en';

        const user = await UsersService.update(id, payload, lang);

        res.json(user);
    }

    static async destroy(req: Request, res: Response, next: NextFunction) {
        const id = +req.params.id;

        const isDeleted = await UsersService.destroy(id);

        if (!isDeleted) {
            throw new NotFoundException('User not found');
        }

        res.json({ message: 'User deleted' });
    }

    static async borrow(req: Request, res: Response, next: NextFunction) {
        const id = +req.params.id;
        const bookId = +req.params.bookId;
        await UsersService.borrow(id, bookId);
        res.json({ message: 'Transaction successful' });
    }

    static async return(req: Request, res: Response, next: NextFunction) {
        const id = +req.params.id;
        const bookId = +req.params.bookId;
        const payload = req.body;
        await UsersService.return(id, bookId, payload.score);
        res.json({ message: 'Transaction successful' });
    }
}

