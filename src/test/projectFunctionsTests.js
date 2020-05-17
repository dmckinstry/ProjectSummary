const target = require("../projectFunctions");
const assert = require('assert');

describe('projectFunctions', function() {
  describe('#getRoot()', function() {
    it('Should throw an exception if both are null', function() {
      try {
        var fail = target.getRoot(null, null);
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
  })
})