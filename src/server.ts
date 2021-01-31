require('dotenv').config();
import {useExpressServer, Action} from "routing-controllers";

import User from "./database/entities/User";
import isAuth from "./middlewares/isAuth";
import currentUserChecker from "./middlewares/currentUserChecker";
import db from "./database";
import app from "./app";

const server = useExpressServer(app, {
    authorizationChecker: async (action: Action, roles: string[]) => {
        const user: User = await isAuth(action);
        if (user && !roles.length)
            return true;

        if (user && roles.find(role => user.role === role))
            return true;

        await action.response.json({
            msg: 'You do not have permission for this operation'
        });

        return false;
    },
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
        const port = process.env.PORT || 8080;
        console.log('connected to db');
        server.listen(port, () => {
            if (process.env.NODE_ENV !== 'test')
                console.log(`Server up and running on port ${port}`)
        })
    } catch (e) {
        console.log(e)
    }
}

connectServer();

export default server
