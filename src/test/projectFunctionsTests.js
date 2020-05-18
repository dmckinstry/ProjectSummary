const target = require("../projectFunctions");
const assert = require('assert');

describe('projectFunctions', function() {
/*
** getRoot tests
*/
  describe('#getRoot()', function() {
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
  describe('#getCardQuery()', function() {
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
  })
})

