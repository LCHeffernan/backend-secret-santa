const { expect } = require('chai');
const request = require('supertest');
const { Event, User } = require('../models/index');
const app = require('../index');

describe('/events', () => {
  before(async () => Event.sequelize.sync());

  beforeEach(async () => {
    await Event.destroy({ where: {} });
    // users = await Promise.all([
    //   User.create({
    //     first_name: 'John',
    //     last_name: 'Smith',
    //     email: 'test@test.com',
    //     password: 'Password1',
    //   }),
    //   User.create({
    //     first_name: 'Jane',
    //     last_name: 'Doe',
    //     email: 'testing@testing.com',
    //     password: 'Password1',
    //   }),
    // ]);
  });

  describe('with no records in the database', () => {
    describe('POST /events', () => {
      it('creates a new event in the database', async () => {
        const response = await request(app)
          .post('/events')
          .send({
            title: 'test xmas',
            exchange_date: 2022-11-15,
            budget: 10,
            participants: 'John',
            drawn: false,
          });
        const newEventRecord = await Event.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(response.body.title).to.equal('test xmas');
        expect(newEventRecord.title).to.equal('test xmas');
        // expect(response.body.exchange_date).to.equal(2022 - 11 - 15);
        // expect(newEventRecord.exchange_date).to.equal(2022 - 11 - 15);
        expect(response.body.budget).to.equal(10);
        expect(newEventRecord.budget).to.equal(10);
        expect(response.body.participants).to.equal('John');
        expect(newEventRecord.participants).to.equal('John');
        expect(response.body.drawn).to.equal(false);
        expect(newEventRecord.drawn).to.equal(false);    
      });

      it('throws an error if title is null', async () => {
        const response = await request(app).post('/events').send({
            title: null,
            exchange_date: 2022-11-15,
            budget: 10,
            participants: 'John',
            drawn: false, 
        })

        expect(response.status).to.equal(500);
      });

      it('throws an error if drawn is missing', async () => {
        const response = await request(app).post('/events').send({
            title: "test xmas",
            exchange_date: 2022-11-15,
            budget: 10,
            participants: 'John',
        })

        expect(response.status).to.equal(500);
      });
    });
  });
});
