import "reflect-metadata";
import express from "express";
import cors from 'cors';
import helmet from "helmet";
import {useContainer} from "routing-controllers";
import {Container} from "typedi";
import logger from "morgan";
import path from "path";
// import exphbs from 'express-handlebars';

useContainer(Container);
const app = express();
// const hbs = exphbs.create({
//     extname: "hbs",
//     // defaultLayout: __dirname + '/views/layouts/index.hbs',
//     // layoutsDir: __dirname + '/views/layouts/',
//     // partialsDir: __dirname + '/views/partials/'
// });

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// app.engine('hbs', hbs.engine);
// app.set('view engine', 'hbs');
// app.set("views", "src/views");


app.use([
    helmet(),
    express.json(),
    express.urlencoded({extended: false}),
    logger('tiny'),
]);


app.get('/', (req, res) => {
    res.send('Hello World!')
});

export default app




