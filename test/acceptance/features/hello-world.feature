Feature: Hello World Acceptance Tests

  Scenario: Restaurant is open
    Given the client wants to know if he can enter
    When the restaurant is open
    Then the restaurant should say "Hello World"

  Scenario: Restaurant is closed
    Given the client wants to know if he can enter
    When the restaurant is closed
    Then the restaurant should say "Come back later"
