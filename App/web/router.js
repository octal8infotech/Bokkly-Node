import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import route from '../Controller/_router.js';
export default (app) => {
    app.use(cors());
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/', route);

    app.use((req, res) => {
        return res.status(404).send({ message: 'Url Not Found.' });
    });
};
