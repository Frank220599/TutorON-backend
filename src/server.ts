require('dotenv').config();
import {useExpressServer} from "routing-controllers";

import currentUserChecker from "./middlewares/currentUserChecker";
import db from "./database";
import app from "./app";


const server = useExpressServer(app, {
    currentUserChecker: (action) => currentUserChecker(action),
    cors: true,
    routePrefix: "/api/v1",
    controllers: [__dirname + '/controllers/*.ts'],
    validation: {
        forbidUnknownValues: true,
        whitelist: true,
        validationError: {
            value: false,
            target: false,
        }
    }
});

const connectServer = async () => {
    try {
        await db();
        console.log('connected to db');

        const port = process.env.PORT || 8080;
        await server.listen(port, () => {
            if (process.env.NODE_ENV !== 'test')
                console.log(`Server up and running on port ${port}`)
        })
    } catch (e) {
        console.log(e)
    }
}

connectServer();

export default server
