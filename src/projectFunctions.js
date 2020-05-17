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

const _getProjectStats = getProjectStats;
const _getRoot = getRoot;

export { _getProjectStats as getProjectStats }
export { _getRoot as getRoot };