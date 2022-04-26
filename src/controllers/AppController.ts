import { Request, Response, Router } from 'express';
import AppService from '../services/AppService';

const AppController = Router();

AppController.get('/hello', (_request: Request, response: Response) => {
    try {
        const name = String(_request.query.name);
        const serviceResult = AppService.sayHello(name);
        response.send(serviceResult);
    } catch (error) {
        response.status(500).send('Error !');
    }
});

export default AppController;
