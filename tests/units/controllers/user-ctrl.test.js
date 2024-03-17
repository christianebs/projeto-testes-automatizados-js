const { faker } = require('@faker-js/faker');
const UserController = require('../../../src/controllers/user-ctrl');
const UserService = require('../../../src/services/user-service');
const Email = require('../../../src/utils/email-validator');
const { User, req, res } = require('../../mocks/test-mocks');

const UserServiceMock = {
  create: () => ({ id: faker.database.mongodbObjectId() }),
  error: () => { throw new Error() }
};

describe('[user-ctrl] - create', () => {
  test('Should return status 201 for a new user created', async () => {
    jest.spyOn(Email, 'isValid').mockImplementationOnce(User.isValid);
    jest.spyOn(UserService, 'createUser').mockImplementationOnce(UserServiceMock.create);

    jest.spyOn(res, 'status');
    await UserController.create(req('success'), res);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('Should return status 400 if the password is not provided', async () => {
    jest.spyOn(Email, 'isValid').mockImplementationOnce(User.isValid);
    jest.spyOn(res, 'status');
    await UserController.create(req('no-password'), res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('Should return status 400 if the email is invalid', async () => {
    jest.spyOn(Email, 'isValid').mockImplementationOnce(User.isNotValid);
    jest.spyOn(res, 'status');
    await UserController.create(req('no-email'), res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('Should return status 500 for internal server error', async () => {
    jest.spyOn(Email, 'isValid').mockImplementationOnce(UserServiceMock.error);
    jest.spyOn(res, 'status');

    await UserController.create(req('success'), res);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});

describe('[user-ctrl] - changePassword', () => {
  test('Should return status 200 if the password is successfully changed', async () => {
    const reqMock = {
      userEmail: faker.internet.email()
    };

    jest.spyOn(res, 'status');
    await UserController.changePassword(reqMock, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
