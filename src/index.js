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

  console.log(`Repo URL: ${repoUrl}`);
  console.log(`Project name: ${project}`);

  var summary = projectFunctions.getProjectStats(org, login, repo, project, token);
  core.setOutput("summary", summary);
  
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}