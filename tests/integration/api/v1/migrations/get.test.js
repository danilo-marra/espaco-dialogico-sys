import database from "infra/database.js";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public");
}

test("GET to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);

  // const isTestEnvironment = process.env.NODE_ENV === "test";
  // expect(isTestEnvironment).toBe(true);
  // console.log(process.env.NODE_ENV);

  // const isHostEnvDevelopmentLoaded = process.env.POSTGRES_HOST === "localhost";
  // expect(isHostEnvDevelopmentLoaded).toBe(true);
  // console.log(process.env.POSTGRES_HOST);

  const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
});
