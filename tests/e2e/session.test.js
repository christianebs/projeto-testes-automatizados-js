require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../src/app");
const User = require("../../src/schemas/User");
const { req } = require('../mocks/test-mocks')

describe("[e2e] SESSION CONTROLLER", () => {
  beforeAll(async () => {
    jest.setTimeout(10000);

    await mongoose.connect(process.env.MONGO_DB_BASE_URL);
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  describe("CREATE SESSION", () => {
    it("Should return 400 when a valid email is not passed.", async () => {
      const res = await request(app).post("/session").send(req("no-email").body);

      expect(res.status).toBe(400);
    });

    it("Should return 400 when a valid password is not passed.", async () => {
      const res = await request(app).post("/session").send(req("no-password").body);

      expect(res.status).toBe(400);
    });

    it("Should return 404 when the user is not found.", async () => {
      const res = await request(app).post("/session").send(req("success").body);

      expect(res.status).toBe(404);
    });

    it("Should return status 200 when a session is created", async () => {
      await User.create(req("success").body);

      const res = await request(app)
        .post("/session")
        .send(req("success").body);

      expect(res.status).toBe(200);
    });
  });
});
