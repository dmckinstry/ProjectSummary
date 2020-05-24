const core = require('@actions/core');
const github = require('@actions/github');
const projectFunctions = require("./projectFunctions");

try {
  // Read all input parameters
  const org = core.getInput('org');
  const login = core.getInput('login');
  const repo = core.getInput('repo');
  const project = core.getInput('project');
  const token = core.getInput('token');

  var root = projectFunctions.getRoot(org, login);
  var repoUrl = `https://github.com/${root}/${repo}/`;

  console.debug(`Repo URL: ${repoUrl}`);
  console.debug(`Project name: ${project}`);

  projectFunctions.getProjectStats(org, login, repo, project, token)
    .catch((error) => {
      console.error(`ERROR: ${error}`)
      core.setFailed(error.message);
    })
    .then(( response ) => {
      console.debug(`Results: ${response}`);
      core.setOutput("summary", response);    
    })
  
  // Get the JSON webhook payload for the event that triggered the workflow
  //const payload = JSON.stringify(github.context.payload, undefined, 2);
  //console.debug(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}