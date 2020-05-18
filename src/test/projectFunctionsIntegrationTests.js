const target = require("../projectFunctions");
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const token = "70087510326a68a7565c8dfc9c21f60fa3d1ad26";

describe('projectFunctions-Integration', function() {
  /*
  ** getRoot tests
  */
  describe('#getProjectNumber()', function() {
    it('Should return correct project number in known public user project', function() {
      return expect(
        target.getProjectNumber(null, "dmckinstry", "ProjectSummary", "ProjectSummaryTest", token)
      ).to.eventually.equal(1);
    }),
    it('Should return correct project number in known public org project', function() {
      return expect(
        target.getProjectNumber("Microsoft", null, "TypeScript", "Rolling Work Tracking", token)
      ).to.eventually.equal(5);
    })

    // TO DO: Add private project searches

  })
})