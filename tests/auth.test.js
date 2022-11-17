const { expect } = require('chai');
const request = require('supertest');
const { User } = require('../models');
const app = require('../index');

describe('/api/auth/', () => {
  before(async () => User.sequelize.sync());

  beforeEach(async () => {
    await User.destroy({ where: {} });
  });
  describe('with no records in the database', () => {
    describe('POST /api/auth/signup', () => {
      it('creates a new user in the database', async () => {
        const response = await request(app).post('/api/auth/signup').send({
          first_name: 'John',
          last_name: 'Smith',
          email: 'test@test.com',
          password: 'Password1',
        });
        console.log(response.body);
        expect(response.body.message).to.equal(
          'User was registered successfully!'
        );
      });
    });
    it('throws an error if empty password is given', async () => {
      const response = await request(app).post('/users').send({
        first_name: 'John',
        last_name: 'Smith',
        email: 'test@test.com',
        password: '',
      });
      expect(response.status).to.equal(500);
      expect(response.body.errors[0].message).to.equal('We need a password');
    });
  });
});
