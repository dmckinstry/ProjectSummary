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
  var results;
  if (organization < user ) { 
    results = user;
  } else {
    results = organization;
  }
  return results;
}

module.exports.getProjectStats = getProjectStats;
module.exports.getRoot = getRoot ;
