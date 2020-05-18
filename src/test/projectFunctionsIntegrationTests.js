const target = require("../projectFunctions");
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe('projectFunctions-Integration', function() {
  /*
  ** getRoot tests
  */
  describe('#getProjectNumber()', function() {
    it('Should return correct project number in known public user project', function() {
      return expect(
        target.getProjectNumber(null, "dmckinstry", "ProjectSummary", null)
      ).to.eventually.equal(1);
    })
  })
})