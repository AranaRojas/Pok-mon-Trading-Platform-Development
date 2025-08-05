import request from "supertest";
import app from "../src/index";

describe("Auth Tests", () => {
  it("should register a user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ username: "testuser", password: "testpass" });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("pokemons");
  });

  it("should login the user", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({ username: "loginuser", password: "loginpass" });
    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "loginuser", password: "loginpass" });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });
});