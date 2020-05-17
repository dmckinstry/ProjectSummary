/*
**
*/
function getProjectStats(org, user, repo, project, token) {
  return "TBD";
}

const _getProjectStats = getProjectStats;
export { _getProjectStats as getProjectStats }

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

const _getRoot = getRoot;
export { _getRoot as getRoot };