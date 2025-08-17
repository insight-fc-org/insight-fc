Feature: List upcoming fixtures
  Scenario: Default pagination
    Given the system has fixtures scheduled in the next 60 minutes
    When I GET /fixtures without params
    Then the response status should be 200
    And the response body includes "page" 1 and "limit" 20
    And each fixture has a timestamp in the future