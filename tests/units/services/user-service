const { faker } = require('@faker-js/faker')

const UserService = require('../../../src/services/user-service')
const User = require('../../../src/schemas/User')

const UserMock = {
    findOne: jest.fn(),
    create: jest.fn()
}

const user = {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password()
}

beforeAll(() => {
    jest.spyOn(User, 'findOne').mockImplementation(UserMock.findOne)
    jest.spyOn(User, 'create').mockImplementation(UserMock.create)
})

afterEach(() => {
    User.findOne.mockClear()
    User.create.mockClear()
})

describe('User service tests', () => {
    test('Should return an ID when a new user is created', async () => {
        UserMock.create.mockResolvedValue({ id: faker.datatype.number() })

        const userCreated = await UserService.createUser(user)

        expect(userCreated).toHaveProperty('id')
        expect(User.create).toHaveBeenCalledWith(user)
    })

    test('Should not reject the operation if there is an user in db with the same email', async () => {
        UserMock.findOne.mockResolvedValueOnce({ ...user, id: faker.database.mongodbObjectId() })
    
        const userCreated = await UserService.createUser(user)
    
        expect(userCreated).toHaveProperty('id')
    })

    test('Should verify a user exists and the password is correct', async () => {
        UserMock.findOne.mockResolvedValue(user)

        const result = await UserService.userExistsAndCheckPassword({ email: user.email, password: user.password })

        expect(result).toBe(true)
    })

    test('Should return false if the user does not exist', async () => {
        UserMock.findOne.mockResolvedValue(null)

        const result = await UserService.userExistsAndCheckPassword({ email: user.email, password: user.password })

        expect(result).toBe(false)
    })

    test('Should throw an error if the password is incorrect', async () => {
        UserMock.findOne.mockResolvedValue({ ...user, password: 'wrongPassword' })

        await expect(
            UserService.userExistsAndCheckPassword({ email: user.email, password: 'incorrectPassword' })
        ).rejects.toEqual({ status: 400, message: 'As senhas não batem' })
    })
})
