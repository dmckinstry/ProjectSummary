const target = require("../projectFunctions");
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe('projectFunctions-Integration', function() {
  const token = process.env.TOKEN;

  /*
  ** getProjectNumber tests
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
    }),
    it('Nonexistent project should throw exception', function() {
      return expect(
        target.getProjectNumber(null, "dmckinstry", "NoSuchRepo", "NoSuchProject", token)
      ).to.be.eventually.rejectedWith(Error);
    })
  }),

  /*
  ** getProjectStats tests
  */
  describe('#getProjectStats()', function() {
    it('Should return statistics for a known public user project', async() => {
      const results = await target.getProjectStats(null, "dmckinstry", "ProjectSummary", "ProjectSummaryTest", token);

      // TO DO: Decompose "results" into individual statistics
      // Expect:
      // Array of columns; for each column
      //  - ColumnName
      //  - Key(Total) Value(Count)
      //  - Key(Label) Value(Array[Key(<label>),Value(Count)]
      //  - Key(Assignee) Value(Array[Key(<assignee>),Value(Count)]

      expect(results.length, "No columns found").to.be.greaterThan(0);
    })
  }) 
})