Feature: User Management
  As a system user
  I want to manage user data
  So that I can create, update, and retrieve user information

  Scenario: Creating a new user
    Given a user with the following details:
      | Name     | Email                |
      | New User | new-user@example.com |
    When I send a POST request to "/user"
    Then the response status code should be 201
    And the response body should contain the created user details

  Scenario: Updating an existing user
    Given a user with the following details:
      | Name | Email           |
      | Bob  | bob@example.com |
    And the user ID is stored
    When I send a PUT request to "/user"
    Then the response status code should be 200
    And the response body should contain the updated user details

  Scenario: Retrieving all users
    When I send a GET request to "/user"
    Then the response status code should be 200
    And the response body should contain a list of users

  Scenario: Retrieving a user by ID
    Given a user exists with the following details:
      | ID  | Name      | Email                 |
      | 123 | Test User | test-user@example.com |
    When I send a GET request to "/user/123"
    Then the response status code should be 200
    And the response body should contain the user details
