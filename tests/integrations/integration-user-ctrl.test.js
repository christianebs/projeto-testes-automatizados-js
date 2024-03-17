require('dotenv').config();
const mongoose = require('mongoose');

const UserController = require('../../src/controllers/user-ctrl');
const { res, req } = require('../mocks/test-mocks');

describe('[integration][user-ctrl] - create', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_DB_URL);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('Should return status 200 for a new user created at database', async () => {
    jest.spyOn(res, 'status');
    await UserController.create(req('success'), res);
    expect(res.status).toBeCalledWith(200);
  });

  test('Should return status 400 if the email is invalid', async () => {
    jest.spyOn(res, 'status');
    await UserController.create(req('no-email'), res);
    expect(res.status).toBeCalledWith(400);
  });

  test('Should return status 400 if the password is not provided', async () => {
    jest.spyOn(res, 'status');
    await UserController.create(req('no-password'), res);
    expect(res.status).toBeCalledWith(400);
  });
});
