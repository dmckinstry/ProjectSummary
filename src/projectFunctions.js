const { graphql } = require("@octokit/graphql");

/*
**
*/
async function getProjectStats(org, user, repo, project, token) {

  //var projectNumber = await getProjectNumber(org, user, repo, project, token);
  //var cardQl = getCardQuery(org, user, repo, projectNumber);

  // Expect:
  // Array of columns; for each column
  //  - ColumnName
  //  - Key(Total) Value(Count)
  //  - Key(Label) Value(Array[Key(<label>),Value(Count)]
  //  - Key(Assignee) Value(Array[Key(<assignee>),Value(Count)]

  const keyEnum = { Total:1, Label:2, Assignee:4 };

  var results = [
    { Column: "New", Statistics: [
      { Key: keyEnum.Total, Value: 0 }]},
    { Column: "Doing", Statistics: [
      { Key: keyEnum.Total, Value: 3 }, 
      { Key: keyEnum.Label, Value: [{ Key: "Label1", Value: 1}, { Key: "Label 2", Value: 3 }]}]},
    { Column: "Done", Statistics: [
      { Key: keyEnum.Total, Value: 3 },
      { Key: keyEnum.Label, Value: [{ Key: "Label1", Value: 1 }]},
      { Key: keyEnum.Assignee, Value: [{ Key: "dmckinstry", Value: 1 }]}]}
  ];

  console.log(results);

  return results;
}

/*
**
*/
async function getProjectNumber(org, user, repo, projectName, token) {
  const results = await getProjectData(org, user, repo, projectName, token);
  var projectArray;
  if (org === null || org === "") {
    projectArray = results.user.repository.projects.nodes;
  } else {
    projectArray = results.organization.repository.projects.nodes;
  }
  
  var projectNumber = -999;
  for(i=0; i<projectArray.length; i++) { 
    if (projectArray[i].name === projectName) {
      projectNumber = projectArray[i].number;
      break;
    }
  }
  if (projectNumber > 0)
    return projectNumber;
  else
    throw("Project not found");
}

async function getProjectData(org, user, repo, projectName, token) {
  const projectQl = getProjectsQuery(org, user, repo);
  const graphqlWithAuth = graphql.defaults({
    headers: {
      authorization: `token ${token}`,
    },
  });

  return await graphqlWithAuth(projectQl);
}

function getProjectsQuery(org, user, repo) {
  var root = getRootText(org, user);
  var query = `
  {
    ${root.Key}(login: "${root.Value}") {
      repository(name: "${repo}") {
        projects(first:100) {
          nodes {
            number
            name
          }
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

module.exports.getProjectNumber = getProjectNumber;
module.exports.getProjectStats = getProjectStats;
module.exports.getCardQuery = getCardQuery;
module.exports.getProjectsQuery = getProjectsQuery;
module.exports.getRoot = getRoot ;
