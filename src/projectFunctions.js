/*
**
*/
function getProjectStats(org, user, repo, project, token) {
  var projectQl = "";

  // TO DO: Query for project number based on name
  var projectNumber = 1;

  var cardQl = getCardQuery(org, user, repo, projectNumber);

  // Real work still TBD

  return graphQl;
}

/*
** getQueryText - Create GitHub GraphQL to retrieve card and issue info related to projects
*/
function getCardQuery(org, user, repo, projectNumber) {
  var rootKey, rootValue;
  if ((org !== null) && (org !== "")) {
    rootKey = "organization";
    rootValue = org;
  } else {
    rootKey = "user";
    rootValue = user;
  }

  var ql = `
  {
    ${rootKey}(login: "${rootValue}") {
      repository(name: "${repo}") {
        project(number: ${projectNumber}) {
          name
          columns(first: 100) {
            nodes {
              cards(first: 100) {
                nodes {
                  content {__typename}
                  note
                  id
                }
              }
            }
          }
        }
        
        issues(first: 100, states: OPEN) {
          nodes {
            id
            number
            title
            assignees(first: 100) {
              nodes {
                name
              }
            }
            labels(first: 100) {
              nodes {
                name
              }            
            }
            
            projectCards(first: 100, archivedStates: NOT_ARCHIVED) {
              nodes {
                project {
                  name
                }
                column {
                  name
                }
              }
            }
          }
        }
      }
    }
  }`

  return ql;
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
module.exports.getCardQuery = getCardQuery;
module.exports.getRoot = getRoot ;
