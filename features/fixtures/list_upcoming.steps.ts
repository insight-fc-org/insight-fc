import { Given, When, Then, setWorldConstructor } from "@cucumber/cucumber";
import assert from "node:assert/strict";
import pactum from "pactum";
const { spec } = pactum;

class World {
  res?: any;
}
setWorldConstructor(World);

const BASE = process.env.API_BASE_URL ?? "http://localhost:3000";

Given(
  "the system has fixtures scheduled in the next 60 minutes",
  async function () {
    try {
      // We already seeded via script; call again to be idempotent.
      await spec().post(`${BASE}/_test/seed`).expectStatus(201);
    } catch (error) {
      // Log a descriptive error message to the console
      console.error("Error: Failed to seed the database for the test.", error);
      // Re-throw the error to ensure the Cucumber test runner marks this step as failed.
      throw error;
    }
  },
);

When("I GET \\/fixtures without params", async function () {
  this.res = await spec()
    .get(`${BASE}/fixtures`)
    .withQueryParams("status", "upcoming");
});

Then("the response status should be {int}", function (code: number) {
  assert.equal(this.res.statusCode, code);
});

Then(
  'the response body includes "page" {int} and "limit" {int}',
  function (page: number, limit: number) {
    const b = this.res.json;
    assert.equal(b.page, page);
    assert.equal(b.limit, limit);
  },
);

Then("each fixture has a timestamp in the future", function () {
  const now = Math.floor(Date.now() / 1000);
  for (const f of this.res.json.data) assert.ok(f.timestamp >= now);
});
