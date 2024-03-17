const { faker } = require('@faker-js/faker');

const User = {
  isValid: async () => true,
  isNotValid: () => false,
};

const reqMock = {
  'success': {
    body: {
      email: faker.internet.email(),
      password: faker.random.word()
    }
  },
  'no-password': {
    body: {
      name: faker.name.fullName(),
      email: faker.internet.email()
    }
  },
  'no-email': {
    body: {
      name: faker.name.fullName(),
      email: '',
      password: faker.random.word()
    }
  },
  'change-password': {
    body: {
      userEmail: faker.internet.email()
    }
  }
};

const req = (params) => reqMock[params];

const res = {
  status: (status) => {
    return {
      json: (data) => { }
    }
  }
};

module.exports = {
  User,
  req,
  res
}