const { expect } = require('chai');
const request = require('supertest');
const { Event, User } = require('../models/index');
const app = require('../index');

describe('/events', () => {
  before(async () => Event.sequelize.sync());

  beforeEach(async () => {
    await Event.destroy({ where: {} });
  });

  describe('with no records in the database', () => {
    describe('POST /events', () => {
      it('creates a new event in the database', async () => {
        const response = await request(app)
          .post('/events')
          .send({
            title: 'test xmas',
            exchange_date: 2022 - 11 - 15,
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
        const response = await request(app)
          .post('/events')
          .send({
            title: null,
            exchange_date: 2022 - 11 - 15,
            budget: 10,
            participants: 'John',
            drawn: false,
          });

        expect(response.status).to.equal(500);
      });

      it('throws an error if drawn is missing', async () => {
        const response = await request(app)
          .post('/events')
          .send({
            title: 'test xmas',
            exchange_date: 2022 - 11 - 15,
            budget: 10,
            participants: 'John',
          });

        expect(response.status).to.equal(500);
      });
    });
  });

  describe('with records in the database', () => {
    let events;
    const error404Message = 'Entry not found.';

    beforeEach(async () => {
      events = await Promise.all([
        Event.create({
          title: 'test xmas',
          exchange_date: 2022 - 11 - 15,
          budget: 10,
          participants: 'John',
          drawn: false,
        }),
        Event.create({
          title: 'test2 xmas',
          exchange_date: 2022 - 12 - 15,
          budget: 5,
          participants: 'Jane',
          drawn: true,
        }),
      ]);
    });

    describe('EVENT /events', () => {
      it('get all event records', async () => {
        const response = await request(app).get('/events');

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(2);

        response.body.forEach((event) => {
          const expected = events.find((item) => item.id === event.id);

          expect(event.title).to.equal(expected.title);
          expect(event.exchange_date).to.equal(expected.exchange_date);
          expect(event.budget).to.equal(expected.budget);
          expect(event.participants).to.equal(expected.participants);
          expect(event.drawn).to.equal(expected.drawn);
        });
      });
    });

    describe('GET /events/:id', () => {
      it('gets events record by id', async () => {
        const event = events[0];
        const response = await request(app).get(`/events/${event.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.title).to.equal(event.title);
        expect(response.body.exchange_date).to.equal(event.exchange_date);
        expect(response.body.budget).to.equal(event.budget);
        expect(response.body.participants).to.equal(event.participants);
        expect(response.body.drawn).to.equal(event.drawn);
      });

      it('returns a 404 if the event does not exist', async () => {
        const response = await request(app).get('/events/12345');

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal(error404Message);
      });
    });
  });
});
