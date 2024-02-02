import assert from "assert";
import { Given, When, Then } from "@cucumber/cucumber";

const checkIfUserCanEnter = (restaurantStatus: string) => {
  if (restaurantStatus === "open") return "Hello World";
  return "Come back later";
};

Given("the client wants to know if he can enter", function () {});

When("the restaurant is open", function () {
  this.restaurantStatus = "open";
});

When("the restaurant is closed", function () {
  this.restaurantStatus = "closed";
});

Then("the restaurant should say {string}", function (expected: string) {
  const message = checkIfUserCanEnter(this.restaurantStatus);
  assert.strictEqual(message, expected);
});
