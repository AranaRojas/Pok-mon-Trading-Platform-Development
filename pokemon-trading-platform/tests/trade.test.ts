import request from "supertest";
import app from "../src/index";

describe("Trade Tests", () => {
  let token = "";
  let toUserId = "";

  beforeAll(async () => {
    await request(app).post("/api/auth/register").send({ username: "trader1", password: "pass" });
    const res = await request(app).post("/api/auth/login").send({ username: "trader1", password: "pass" });
    token = res.body.token;

    await request(app).post("/api/auth/register").send({ username: "trader2", password: "pass" });
    const res2 = await request(app).post("/api/auth/login").send({ username: "trader2", password: "pass" });
    // Suponiendo que el ID se obtiene de la respuesta del login o un endpoint real
    toUserId = "REPLACE_WITH_REAL_USER_ID";
  });

  it("should create a trade request", async () => {
    const res = await request(app)
      .post("/api/trades")
      .set("Authorization", `Bearer ${token}`)
      .send({
        toUserId,
        offeredPokemon: { name: "pikachu", level: 10, rarity: "common" },
        requestedPokemon: { name: "bulbasaur", level: 10, rarity: "common" }
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "Trade request sent");
  });
});