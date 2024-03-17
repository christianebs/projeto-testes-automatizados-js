const { faker } = require('@faker-js/faker');
const jwt = require('jsonwebtoken')
const SessionController = require('../../../src/controllers/session-ctrl');
const UserService = require('../../../src/services/user-service');
const Email = require('../../../src/utils/email-validator');
const SessionService = require('../../../src/services/session-service');
const { User, req, res } = require('../../mocks/test-mocks');

const UserServiceMock = {
  checkPassword: async () => true,
  wrongPassword: () => false,
  error: () => { throw new Error() }
};

const SessionServiceMock = {
  generateToken: (email) => jwt.sign({ email }, process.env.SECRET_KEY)
};

describe('[session-ctrl] - create', () => {
  test('Should return status 200 for a new generated token', async () => {
    jest.spyOn(Email, 'isValid').mockImplementationOnce(User.isValid);
    jest.spyOn(UserService, 'userExistsAndCheckPassword').mockImplementationOnce(UserServiceMock.checkPassword);
    jest.spyOn(SessionService, 'generateToken').mockReturnValueOnce(SessionServiceMock.generateToken);
    jest.spyOn(res, 'status');

    await SessionController.create(req('success'), res);
    expect(res.status).toBeCalledWith(200);
  });

  test('Should return status 400 if the email is invalid', async () => {
    const reqMock = {
      body: {
        email: '',
        password: faker.random.word()
      }
    };

    jest.spyOn(Email, 'isValid').mockImplementationOnce(User.isNotValid);
    jest.spyOn(res, 'status');
    await SessionController.create(reqMock, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('Should return status 400 if the password is not provided', async () => {
    const reqMock = {
      body: {
        email: faker.internet.email()
      }
    };

    jest.spyOn(Email, 'isValid').mockImplementationOnce(User.isValid);
    jest.spyOn(res, 'status');
    await SessionController.create(reqMock, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('Should return status 404 if user is not found', async () => {
    jest.spyOn(Email, 'isValid').mockImplementationOnce(User.isValid);
    jest.spyOn(UserService, 'userExistsAndCheckPassword').mockImplementationOnce(UserServiceMock.wrongPassword);
    jest.spyOn(res, 'status');

    await SessionController.create(req('success'), res);
    expect(res.status).toBeCalledWith(404);
  });

  test('Should return status 500 for internal server error', async () => {
    jest.spyOn(Email, 'isValid').mockImplementationOnce(UserServiceMock.error);
    jest.spyOn(res, 'status');

    await SessionController.create(req('success'), res);
    expect(res.status).toBeCalledWith(500);
  });
});
