const { expect } = require('chai');
const request = require('supertest');
const { User } = require('../models/index');
const app = require('../index');

describe('/users', () => {
    before(async () => User.sequelize.sync());

    beforeEach(async () => {
        await User.destroy({ where: {} });
    });

    describe('with no records in the database', () => {
        describe('POST /users', () => {
            it('creates a new user in the database', async () => {
                const response = await request(app).post('/users').send({
                    first_name: 'John',
                    last_name: 'Smith',
                    email: 'test@test.com',
                    password: 'Password1',
                });
                const newUserRecord = await User.findByPk(response.body.id, {
                    raw: true,
                });

                expect(response.status).to.equal(201);
                expect(response.body.first_name).to.equal('John');
                expect(response.body.last_name).to.equal('Smith');
                expect(response.body.password).to.equal('Password1');
                expect(response.body.email).to.equal('test@test.com');
                expect(newUserRecord.first_name).to.equal('John');
                expect(newUserRecord.last_name).to.equal('Smith');
                expect(newUserRecord.password).to.equal('Password1');
            });

            it ('throws an error if empty password is given', async () => {
                const response = await request(app).post('/users').send({
                    first_name: 'John',
                    last_name: 'Smith',
                    email: 'test@test.com',
                    password: '',
                });

                expect(response.status).to.equal(500);
            });

            it ('throws an error if invalid password is given', async () => {
                const response = await request(app).post('/users').send({
                    first_name: 'John',
                    last_name: 'Smith',
                    email: 'test@test.com',
                    password: 'pass',
                });

                expect(response.status).to.equal(500);
            });

            it('throws an error if empty email given', async () => {
                const response = await request(app).post('/users').send({
                    first_name: 'John',
                    last_name: 'Smith',
                    email: '',
                    password: 'Password1',
                });

                expect(response.status).to.equal(500);
            });

            it('throws an error if invalid email given', async () => {
                const response = await request(app).post('/users').send({
                    first_name: 'John',
                    last_name: 'Smith',
                    email: 'test',
                    password: 'Password1',
                });

                expect(response.status).to.equal(500);
            });
        });
    });
});