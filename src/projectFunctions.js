/*
**
*/
function getProjectStats(org, user, repo, project, token) {
  var projectQl = getProjectsQuery(org, user, repo);

  // TO DO: Query for project number based on name
  var projectNumber = 1;

  var cardQl = getCardQuery(org, user, repo, projectNumber);

  // Real work still TBD

  return graphQl;
}

/*
**
*/
function getProjectsQuery(org, user, repo) {
  var root = getRootText(org, user);
  var query = `
  {
    ${root.key}(login: "${root.Value}") {
      repository(name: "${repo}") {
        projects(first:100) {
          nodes {
            number
            name
          }
        }
      }     
    }`;
    return query;  
}

/*
** getCardQuery - Create GitHub GraphQL to retrieve card and issue info related to projects
*/
function getCardQuery(org, user, repo, projectNumber) {
  var root = getRootText(org, user);

  var ql = `
  {
    ${root.Key}(login: "${root.Value}") {
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
function getRootText(org, user) {
  var root = {};
  if ((org !== null) && (org !== "")) {
    root.Key = "organization";
    root.Value = org;
  }
  else {
    root.Key = "user";
    root.Value = user;
  }
  return root;
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
module.exports.getProjectsQuery = getProjectsQuery;
module.exports.getRoot = getRoot ;
