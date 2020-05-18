const target = require("../projectFunctions");
const assert = require('assert');

describe('projectFunctions-Integration', function() {
/*
** getRoot tests
*/
describe('#getProjectNumber()', function() {
  it('Should return correct project number in known public user project', function() {
      assert.equal(
        target.getProjectNumber(null, "dmckinstry" ,"ProjectSummary", null),
        1);
      });
  })  
})
