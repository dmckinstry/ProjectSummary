const target = require("../projectFunctions");
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe('projectFunctions-Integration', function() {
  const token = process.env.TOKEN;

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
    }),
    it('Should return correct project number in known private user project', function() {
      return expect(
        target.getProjectNumber(null, "dmckinstry", "Tracking", "To do", token)
      ).to.eventually.equal(1);
    }),
    it('Should return correct project number in known private org project', function() {
      return expect(
        target.getProjectNumber("GitHub", null, "DevOpsCAT", "FastTrack Engagements", token)
      ).to.eventually.equal(1);
    })

    // TO DO: Add private project searches

  })
})