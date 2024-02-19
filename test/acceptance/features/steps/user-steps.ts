import { Given, When, Then, DataTable } from '@cucumber/cucumber';


Given('a user with the following details:', async function (dataTable: DataTable) { });

Given('a user exists with the following details:', function (dataTable: DataTable) { });

Given('the user ID is stored', async function () { });

When('I send a POST request to {string}', async function (url: string) { });

When('I send a PUT request to {string}', function (string: string) { });

When('I send a GET request to {string}', function (string: string) { });

Then('the response status code should be {int}', async function (statusCode: number) { });

Then('the response body should contain the created user details', async function () { });

Then('the response body should contain the updated user details', async function () { });

Then('the response body should contain a list of users', async function () { });

Then('the response body should contain the user details', async function () { });
