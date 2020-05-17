/*
**
*/
function getProjectStats(org, user, repo, project, token) {
  return "TBD";
}

/*
**
*/
function getRoot(organization, user) {
  var results = null;
  if ((organization === null) || (organization === "")) {
    results = user;
  }
  else if ((user === null) || (user === "")) {
    results = organization;
  }

  if (results === null) {
    throw("Org or Login must be specified");
  }

  return results;
}

module.exports.getProjectStats = getProjectStats;
module.exports.getRoot = getRoot ;
