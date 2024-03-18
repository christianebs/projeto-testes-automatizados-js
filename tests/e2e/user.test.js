require("dotenv").config();

const jwt = require("jsonwebtoken");
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../src/app");
const User = require("../../src/schemas/User");

const { req } = require("../mocks/test-mocks");

const tokenMock = {
  generateToken: (email) => jwt.sign({ email }, process.env.SECRET_KEY),
};

describe("[e2e] USER CONTROLLER", () => {
  beforeAll(async () => {
    jest.setTimeout(10000);

    await mongoose.connect(process.env.MONGO_DB_URL);
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  describe("CREATE USER", () => {
    it("Should return status 200 when a new user is created", async () => {
      const res = await request(app).post("/user").send(req("success").body);

      expect(res.status).toBe(200);
    });

    it("Should return 400 when a valid email is not passed.", async () => {
      const res = await request(app).post("/user").send(req("no-email").body);

      expect(res.status).toBe(400);
    });

    it("Should return 400 when a valid password is not passed.", async () => {
      const res = await request(app).post("/user").send(req("no-password").body);

      expect(res.status).toBe(400);
    });
  });

  describe("CHANGE PASSWORD", () => {
    it("Should return 401 when the password is updated without credentials.", async () => {
      const res = await request(app).post("/change-password").send(req('change-password').body);

      expect(res.status).toBe(401);
    });

    it("Should return 200 when the password is updated.", async () => {
      const token = tokenMock.generateToken("jota@example.com");

      const res = await request(app)
        .post("/change-password")
        .set("Authorization", `Bearer ${token}`)
        .send(req('change-password').body);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("ok");
    });

    it('Should return status 401 when catch a error', async () => {
      const token = 'token_invalido_ou_nulo';

      const res = await request(app)
        .post("/change-password")
        .set('Authorization', `Bearer ${token}`)
        .send(req('change-password').body);

      expect(res.status).toBe(401);
    });
  });
});
