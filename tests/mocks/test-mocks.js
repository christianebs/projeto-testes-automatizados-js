const { faker } = require('@faker-js/faker');

const User = {
  isValid: async () => true,
  isNotValid: () => false,
};

const req = {
  body: {
    email: faker.internet.email(),
    password: faker.random.word()
  }
};

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