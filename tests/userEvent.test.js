const { expect } = require('chai');
const request = require('supertest');
const { UserEvents, Event, User } = require('../models/index');
const app = require('../index');

describe('/userevents', () => {
  before(async () => UserEvents.sequelize.sync());

  beforeEach(async () => {
    await UserEvents.destroy({ where: {} });
  });

  describe('with no records in the database', () => {
    describe('POST /userevents', () => {
      it('creates a new userevent in the database', async () => {
        await request(app).post('/users').send({
          id: 1,
          first_name: 'John',
          last_name: 'Smith',
          email: 'test@test.com',
          password: 'Password1',
        });
        const response = await request(app).post('/userevents').send({
          id: 1,
          UserId: 1,
        });
        const newUserEventRecord = await UserEvents.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(response.body.id).to.equal(1);
        expect(newUserEventRecord.id).to.equal(1);
      });
    });
  });

  describe('with records in the database', () => {
    let users;
    let events;
    let userEvents;
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
          participants: 'John',
          drawn: false,
        }),
      ]);
      userEvents = await Promise.all([
        UserEvents.create({
          UserId: users[0].id,
          BuyForId: users[1].id,
          EventId: events[0].id,
        }),
        UserEvents.create({
          UserId: users[1].id,
          BuyForId: users[0].id,
          EventId: events[0].id,
        }),
        UserEvents.create({
          UserId: users[1].id,
          EventId: events[0].id,
        }),
      ]);
    });

    describe('USEREVENTS /userevents', () => {
      it('get all userevent records', async () => {
        const response = await request(app).get('/userevents');

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        response.body.forEach((userEvent) => {
          const expected = userEvents.find((item) => item.id === userEvent.id);

          expect(userEvent.UserId).to.equal(expected.UserId);
          expect(userEvent.BuyForId).to.equal(expected.BuyForId);
          expect(userEvent.AdminId).to.equal(expected.AdminId);
        });
      });
    });

    describe('GET /userevents/:id', () => {
      it('gets userEvent record by id', async () => {
        const userEvent = userEvents[0];
        const response = await request(app).get(`/userevents/${userEvent.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.id).to.equal(userEvent.id);
        expect(response.body.UserId).to.equal(users[0].id);
        expect(response.body.BuyForId).to.equal(users[1].id);
        expect(response.body.EventId).to.equal(events[0].id);
      });

      it('returns a 404 if userEvent does not exist', async () => {
        const response = await request(app).get('/userevents/12345');

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal(error404Message);
      });
    });

    describe('GET /userevents/userId/:id', () => {
      it('gets userEvent record by user id', async () => {
        const userEvent = userEvents[0];
        const response = await request(app).get(
          `/userevents/userId/${userEvent.UserId}`
        );
        expect(response.status).to.equal(200);

        response.body.forEach((userEvent) => {
          const expected = userEvents.find((item) => item.id === userEvent.id);

          expect(userEvent.UserId).to.equal(expected.UserId);
          expect(userEvent.BuyForId).to.equal(expected.BuyForId);
          expect(userEvent.AdminId).to.equal(expected.AdminId);
        });
      });

      it('returns an empty array if userEvent does not exist', async () => {
        const response = await request(app).get('/userevents/userId/12345');

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(0);
      });
    });

    describe('GET /userevents/eventId/:id', () => {
      it('gets userEvent record by event id', async () => {
        const userEvent = userEvents[0];
        const response = await request(app).get(
          `/userevents/eventId/${userEvent.EventId}`
        );
        expect(response.status).to.equal(200);

        response.body.forEach((userEvent) => {
          const expected = userEvents.find((item) => item.id === userEvent.id);

          expect(userEvent.UserId).to.equal(expected.UserId);
          expect(userEvent.BuyForId).to.equal(expected.BuyForId);
          expect(userEvent.AdminId).to.equal(expected.AdminId);
        });
      });

      it('returns an empty array if userEvent does not exist', async () => {
        const response = await request(app).get('/userevents/eventId/12345');

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(0);
      });
    });

    describe('GET /userevents/usereventsId/:id', () => {
      it('gets userEvent record by userEvent id', async () => {
        const userEvent = userEvents[0];
        const response = await request(app).get(
          `/userevents/eventId/${userEvent.EventId}/userId/${userEvent.UserId}`
        );
        expect(response.status).to.equal(200);

        response.body.forEach((userEvent) => {
          const expected = userEvents.find((item) => item.id === userEvent.id);

          expect(userEvent.UserId).to.equal(expected.UserId);
          expect(userEvent.BuyForId).to.equal(expected.BuyForId);
          expect(userEvent.AdminId).to.equal(expected.AdminId);
        });
      });

      it('returns an empty array if userEvent does not exist', async () => {
        const response = await request(app).get(
          '/userevents/eventId/12345/userId/12345'
        );

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(0);
      });
    });

    describe('PATCH /userevents/eventid/:eventId/userid/:userId"', () => {
        it('updates userevent BuyForId by event and user id', async () => {
          const userEvent = userEvents[2];
          const response = await request(app)
            .patch(`/userevents/eventid/${userEvent.EventId}/userid/${userEvent.UserId}`)
            .send({ BuyForId: 1 });
          const updatedUserEventRecord = await UserEvents.findByPk(userEvent.id, {
            raw: true,
          });
    
          expect(response.status).to.equal(200);
          expect(updatedUserEventRecord.BuyForId).to.equal(1);
        });
      });
  });
});
