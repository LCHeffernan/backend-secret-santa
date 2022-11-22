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
        expect(newUserRecord.first_name).to.equal('John');
        expect(response.body.last_name).to.equal('Smith');
        expect(newUserRecord.last_name).to.equal('Smith');
        expect(response.body.email).to.equal('test@test.com');
        expect(newUserRecord.email).to.equal('test@test.com');
        expect(response.body.password).to.equal('Password1');
        expect(newUserRecord.password).to.equal('Password1');
      });

      it('throws an error if empty password is given', async () => {
        const response = await request(app).post('/users').send({
          first_name: 'John',
          last_name: 'Smith',
          email: 'test@test.com',
          password: '',
        });

        expect(response.status).to.equal(500);
      });

      it('throws an error if invalid password is given', async () => {
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

  describe('with records in the database', () => {
    let users;
    const error404Message = 'The user could not be found.';

    beforeEach(async () => {
      users = await Promise.all([
        User.create({
          first_name: 'John',
          last_name: 'Smith',
          email: 'test@test.com',
          password: 'Password1',
        }),
        User.create({
          first_name: 'Jane',
          last_name: 'Doe',
          email: 'testing@testing.com',
          password: 'Password1',
        }),
      ]);
    });

    describe('USER /users', () => {
      it('get all user records', async () => {
        const response = await request(app).get('/users');

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(2);

        response.body.forEach((user) => {
          const expected = users.find((item) => item.id === user.id);

          expect(user.first_name).to.equal(expected.first_name);
          expect(user.last_name).to.equal(expected.last_name);
          expect(user.email).to.equal(expected.email);
          expect(user.password).to.equal(expected.password);
        });
      });
    });

    describe('GET /users/:id', () => {
      it('gets users record by id', async () => {
        const user = users[0];
        const response = await request(app).get(`/users/${user.id}`);

        response.body.forEach((user) => {
          const expected = users.find((item) => item.id === user.id);

          expect(user.first_name).to.equal(expected.first_name);
          expect(user.last_name).to.equal(expected.last_name);
          expect(user.email).to.equal(expected.email);
          expect(user.password).to.equal(expected.password);
        });
      });

      it('returns a 404 if the user does not exist', async () => {
        const response = await request(app).get('/users/12345');
        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(0);
      });
    });

    describe('PATCH /users/:id', () => {
      it('updates users email by id', async () => {
        const user = users[0];
        const response = await request(app)
          .patch(`/users/${user.id}`)
          .send({ email: 'newtest@test.com' });
        const updatedUserRecord = await User.findByPk(user.id, { raw: true });

        expect(response.status).to.equal(200);
        expect(updatedUserRecord.email).to.equal('newtest@test.com');
      });

      it('updates users likes and dislikes', async () => {
        const user = users[0];
        const response = await request(app)
          .patch(`/users/${user.id}`)
          .send({ likes: 'testing', dislikes: 'testing1, testing2' });
        const updatedUserRecord = await User.findByPk(user.id, { raw: true });

        expect(response.status).to.equal(200);
        expect(updatedUserRecord.likes).to.equal('testing');
        expect(updatedUserRecord.dislikes).to.equal('testing1, testing2');
      });

      it('returns a 404 if the user does not exist', async () => {
        const response = await request(app)
          .patch('/users/12345')
          .send({ likes: 'testing', dislikes: 'testing1, testing2' });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal(error404Message);
      });
    });

    describe('DELETE /users/:id', () => {
      it('deletes user record by id', async () => {
        const user = users[0];
        const response = await request(app).delete(`/users/${user.id}`);
        const deleteUser = await User.findByPk(user.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deleteUser).to.equal(null);
      });

      it('returns 404 if user record does not exist', async () => {
        const response = await request(app).delete('/users/12345');

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal(error404Message);
      });
    });
  });
});
