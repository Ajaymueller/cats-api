/* eslint-disable no-console */
const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');
const { Cat } = require('../src/models/index');

describe('/cats', () => {
  before(async () => {
    try {
      await Cat.sequelize.sync();
    } catch (err) {
      console.log(err);
    }
  });

  beforeEach(async () => {
    try {
      await Cat.destroy({ where: {} });
    } catch (err) {
      console.log(err);
    }
  });

  describe('POST /cat', () => {
    it('creates a new cat in the database', async () => {
      const response = (await request(app).post('/cat').send({
        name: 'Maine Coon',
        continent: 'North America',
        country: 'USA',
        averageLifeSpan: 14,
      }));

      await expect(response.status).to.equal(201);
      await expect(response.body.name).to.equal('Maine Coon');
      await expect(response.body.continent).to.equal('North America');
      await expect(response.body.country).to.equal('USA');
      await expect(response.body.averageLifeSpan).to.equal(14);

      const expected = await Cat.findByPk(response.body.id, { raw: true });
      await expect(expected.name).to.equal('Maine Coon');
      await expect(expected.continent).to.equal('North America');
      await expect(expected.country).to.equal('USA');
      await expect(expected.averageLifeSpan).to.equal(14);
    });
  });

  describe('with cats in the database', () => {
    let cats;
    beforeEach((done) => {
      Promise.all([
        Cat.create({name: 'Maine Coon', continent: 'North America', country: 'USA', averageLifeSpan: 14 }),
        Cat.create({name: 'Burmilla', continent: 'Europe', country: 'UK', averageLifeSpan: 13 }),
      ]).then((documents) => {
        cats = documents;
        done();
      });
    });

    describe('GET /cats', () => {
      xit('gets all cat records', (done) => {
        request(app)
          .get('/cats')
          .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body.length).to.equal(2);
            res.body.forEach((cat) => {
              const expected = cats.find((a) => a.id === cat.id);
              expect(cat.name).to.equal(expected.name);
              expect(cat.continent).to.equal(expected.continent);
              expect(cat.country).to.equal(expected.country);
              expect(cat.averageLifeSpan).to.equal(expected.averageLifeSpan);
            });
            done();
          });
      });
    });
  });
});
