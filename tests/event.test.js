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
      events = await Promise.all([
        Event.create({
          title: 'test xmas',
          exchange_date: 2022 - 11 - 15,
          budget: 10,
          participants: 'Jon',
          drawn: false,
          AdminId: users[0].id,
        }),
        Event.create({
          title: 'test2 xmas',
          exchange_date: 2022 - 12 - 15,
          budget: 5,
          participants: 'Jane',
          drawn: true,
          AdminId: users[1].id,
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

        response.body.forEach((event) => {
          const expected = events.find((item) => item.id === event.id);
          const expectedAdmin = users.find(
            (item2) => item2.id === event.AdminId
          );
          expect(event.title).to.equal(expected.title);
          expect(event.exchange_date).to.equal(expected.exchange_date);
          expect(event.budget).to.equal(expected.budget);
          expect(event.participants).to.equal(expected.participants);
          expect(event.drawn).to.equal(expected.drawn);
          expect(event.Admin.first_name).to.equal(expectedAdmin.first_name);
          expect(event.Admin.last_name).to.equal(expectedAdmin.last_name);
          expect(event.Admin.email).to.equal(expectedAdmin.email);
          expect(event.Admin.password).to.equal(expectedAdmin.password);
        });
      });

      it('returns a 404 if the event does not exist', async () => {
        const response = await request(app).get('/events/12345');

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(0);
      });
    });

    describe('PATCH /events/:id', () => {
      it('updates title by id', async () => {
        const event = events[0];
        const response = await request(app)
          .patch(`/events/${event.id}`)
          .send({ title: 'update test xmas' });
        const updatedEventRecord = await Event.findByPk(event.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedEventRecord.title).to.equal('update test xmas');
      });

      it('updates drawn by id', async () => {
        const event = events[0];
        const response = await request(app)
          .patch(`/events/${event.id}`)
          .send({ drawn: true });
        const updatedEventRecord = await Event.findByPk(event.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedEventRecord.drawn).to.equal(true);
      });

      it('returns a 404 if the event does not exist', async () => {
        const response = await request(app)
          .patch('/events/12345')
          .send({ drawn: true });
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal(error404Message);
      });
    });

    describe('DELETE /events/:id', () => {
      it('deletes event by id', async () => {
        const event = events[0];
        const response = await request(app).delete(`/events/${event.id}`);
        const deleteEvent = await Event.findByPk(event.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deleteEvent).to.equal(null);
      });

      it('returns a 404 if event does not exist', async () => {
        const response = await request(app).delete('/events/12345');

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal(error404Message);
      });
    });
  });
});
