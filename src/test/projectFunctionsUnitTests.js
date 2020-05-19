const target = require("../projectFunctions");
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;

describe('Unit Tests', function() {
/*
** summarizeQueryResults()
*/
describe('summarizeQueryResults()', function() {
  it('Should correctly summarize known data', function() {
    var graphResults = JSON.parse(`{
        "user": {
          "repository": {
            "project": {
              "pendingCards": {
                "totalCount": 0
              },
              "columns": {
                "nodes": [
                  {
                    "name": "To do",
                    "cards": {
                      "totalCount": 3,
                      "nodes": [
                        {
                          "content": {
                            "__typename": "Issue"
                          },
                          "note": null,
                          "id": "MDExOlByb2plY3RDYXJkMzgzNjA3Nzk="
                        },
                        {
                          "content": {
                            "__typename": "Issue"
                          },
                          "note": null,
                          "id": "MDExOlByb2plY3RDYXJkMzgzNjA2NjM="
                        },
                        {
                          "content": null,
                          "note": "Test Card",
                          "id": "MDExOlByb2plY3RDYXJkMzgzNjA2NDQ="
                        }
                      ]
                    }
                  },
                  {
                    "name": "In progress",
                    "cards": {
                      "totalCount": 1,
                      "nodes": [
                        {
                          "content": {
                            "__typename": "Issue"
                          },
                          "note": null,
                          "id": "MDExOlByb2plY3RDYXJkMzgzNjA2NDc="
                        }
                      ]
                    }
                  },
                  {
                    "name": "Done",
                    "cards": {
                      "totalCount": 2,
                      "nodes": [
                        {
                          "content": {
                            "__typename": "Issue"
                          },
                          "note": null,
                          "id": "MDExOlByb2plY3RDYXJkMzgzNjA2NTQ="
                        },
                        {
                          "content": {
                            "__typename": "Issue"
                          },
                          "note": null,
                          "id": "MDExOlByb2plY3RDYXJkMzgzNjA3NTY="
                        }
                      ]
                    }
                  }
                ]
              }
            },
            "issues": {
              "nodes": [
                {
                  "id": "MDU6SXNzdWU2MTk1ODg3NjI=",
                  "number": 1,
                  "title": "Test Issue #1",
                  "assignees": {
                    "nodes": []
                  },
                  "labels": {
                    "nodes": [
                      {
                        "name": "documentation"
                      },
                      {
                        "name": "enhancement"
                      }
                    ]
                  },
                  "projectCards": {
                    "nodes": [
                      {
                        "project": {
                          "name": "ProjectSummaryTest"
                        },
                        "column": {
                          "name": "In progress"
                        }
                      }
                    ]
                  }
                },
                {
                  "id": "MDU6SXNzdWU2MTk1ODg4MzQ=",
                  "number": 2,
                  "title": "Test Issue #2",
                  "assignees": {
                    "nodes": [
                      {
                        "name": "Dave McKinstry"
                      }
                    ]
                  },
                  "labels": {
                    "nodes": [
                      {
                        "name": "enhancement"
                      }
                    ]
                  },
                  "projectCards": {
                    "nodes": [
                      {
                        "project": {
                          "name": "ProjectSummaryTest"
                        },
                        "column": {
                          "name": "Done"
                        }
                      }
                    ]
                  }
                },
                {
                  "id": "MDU6SXNzdWU2MTk1ODkwOTQ=",
                  "number": 3,
                  "title": "Test Issue #3",
                  "assignees": {
                    "nodes": [
                      {
                        "name": "Dave McKinstry"
                      }
                    ]
                  },
                  "labels": {
                    "nodes": [
                      {
                        "name": "bug"
                      }
                    ]
                  },
                  "projectCards": {
                    "nodes": [
                      {
                        "project": {
                          "name": "ProjectSummaryTest"
                        },
                        "column": {
                          "name": "To do"
                        }
                      }
                    ]
                  }
                },
                {
                  "id": "MDU6SXNzdWU2MTk1ODkzNzY=",
                  "number": 4,
                  "title": "Test Issue #4",
                  "assignees": {
                    "nodes": []
                  },
                  "labels": {
                    "nodes": [
                      {
                        "name": "bug"
                      },
                      {
                        "name": "wontfix"
                      }
                    ]
                  },
                  "projectCards": {
                    "nodes": []
                  }
                },
                {
                  "id": "MDU6SXNzdWU2MTk1ODkzODc=",
                  "number": 5,
                  "title": "Test Issue #5",
                  "assignees": {
                    "nodes": []
                  },
                  "labels": {
                    "nodes": []
                  },
                  "projectCards": {
                    "nodes": [
                      {
                        "project": {
                          "name": "ProjectSummaryTest"
                        },
                        "column": {
                          "name": "To do"
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        }
      }`);
    var results = target.summarizeQueryResults(null, "ProjectSummaryTest", graphResults);

    var totalCount = 0;
    var labelCount = 0;
    var assigneeCount = 0;
    results.forEach( function(column) {
      expect(column.Column, "Undefined column name").is.not.undefined;
      expect(column.Column, "Empty column name").is.not.empty;
      column.Statistics.forEach( function(stat) {
        if (stat.Key === 1) { // Don't like this - enum isn't an enum
          totalCount++
        } else if (stat.Key === 2) {
          labelCount++;
        } else if (stat.Key === 4) {
          assigneeCount++;
        } else {
          expect.fail("Unrecognized statistic type");
        }
      })
    })

    expect(totalCount, "Column and total counts don't match").to.equal(results.length);
    expect(labelCount).is.greaterThan(0);
    expect(assigneeCount).is.greaterThan(0);
  })
}),

/*
** getRoot tests
*/
  describe('getRoot()', function() {
    it('Should throw an exception if both are null', function() {
      try {
        var fail = target.getRoot(null, null);
        assert.fail('Exception not thrown');
      }
      catch( error ) {
      }
    }),
    it('Should throw an exception if both are specified', function() {
      try {
        var fail = target.getRoot("org", "login");
        assert.fail('Exception not thrown');
      }
      catch( error ) {
      }
    }),
    it('Should return org when only org is specified', function() {
      assert.equal(target.getRoot("Org-A", null), "Org-A");
    }),
    it('Should return login when only login is specified', function() {
      assert.equal(target.getRoot(null, "User-B"), "User-B");
    })
  }),

/*
** getCardQuery tests
*/
  describe('getCardQuery()', function() {
    it('Should embed org is it is specified', function() {
      assert.match(target.getCardQuery("myOrg", null, "myRepo", 999), /organization\s*\(\s*login:\s*\"myOrg"\s*\)/i);
    }),
    it('Should embed repo with orgs', function() {
      assert.match(target.getCardQuery("myOrg", "", "myRepo", 999), /repository\s*\(\s*name:\s*\"myRepo"\s*\)/i);
    }),
    it('Should embed project number with orgs', function() {
      assert.match(target.getCardQuery("myOrg", "", "myRepo", 999), /project\s*\(\s*number:\s*999\s*\)/i);
    }),
    it('Should embed user is it is specified', function() {
      assert.match(target.getCardQuery("", "myUser", "myOtherRepo", 999), /user\s*\(\s*login:\s*\"myUser"\s*\)/i);
    }),
    it('Should embed repo with users', function() {
      assert.match(target.getCardQuery(null, "myUser", "myOtherRepo", 999), /repository\s*\(\s*name:\s*\"myOtherRepo"\s*\)/i);
    }),
    it('Should embed project number with users', function() {
      assert.match(target.getCardQuery(null, "myUser", "myRepo", 999), /project\s*\(\s*number:\s*999\s*\)/i);
    })
  }),

  /*
  ** getProjectQuery tests
  */
  describe('getProjectsQuery()', function() {
    it('Should embed org is it is specified', function() {
      assert.match(target.getProjectsQuery("myOrg", null, "myRepo"), /organization\s*\(\s*login:\s*\"myOrg"\s*\)/i);
    }),
    it('Should embed repo with orgs', function() {
      assert.match(target.getProjectsQuery("myOrg", "", "myRepo"), /repository\s*\(\s*name:\s*\"myRepo"\s*\)/i);
    }),
    it('Should embed user is it is specified', function() {
      assert.match(target.getProjectsQuery("", "myUser", "myOtherRepo"), /user\s*\(\s*login:\s*\"myUser"\s*\)/i);
    }),
    it('Should embed repo with users', function() {
      assert.match(target.getProjectsQuery(null, "myUser", "myOtherRepo"), /repository\s*\(\s*name:\s*\"myOtherRepo"\s*\)/i);
    })
  })
})
