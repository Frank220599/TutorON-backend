import app from "../src/server";
import faker from 'faker'
const request = require('supertest');

describe('Api Test', () => {
    let token = null;
    const email = faker.internet.email();
    const firstName = faker.name.firstName();


    it('POST /api/v1/auth/signup', async done => {
        const res = await request(app)
            .post('/api/v1/auth/signup')
            .send({
                email: email,
                firstName: firstName,
                password: '123456789'
            });
        token = res.body.token;
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('user');
        done()
    });

    it('POST /api/v1/auth/login', async done => {
        const res = await request(app)
            .post('/api/v1/auth/login')
            .send({
                email: email,
                password: '123456789'
            });
        token = res.body.token;
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('user');
        done()
    });

    it('POST /api/v1/todos', async done => {
        const res = await request(app)
            .post('/api/v1/todos')
            .set('Authorization', 'Bearer ' + token)
            .send({
                title: 'Sample'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('todo');
        done()
    });

    it('GET /api/v1/todos', async done => {
        const res = await request(app)
            .get('/api/v1/todos');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('todos');
        done()
    });

    it('GET /api/v1/todos/1', async done => {
        const res = await request(app)
            .get('/api/v1/todos/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('todo');
        done()
    })
});