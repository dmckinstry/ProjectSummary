# ProjectSummary Action

This action queries a specified project board in GitHub and returns basic statistics including:

- Total number of cards in each column
- Number of cards per Assignee in each column
- Number of cards per Label in each column

Note that the total cards will not necessarily be equal to sums of any other statistic as cards may have zero, one or multiple assignees and labels.  However, total assignee or label counts for a column will not exceed the total number of cards in that column.

## Inputs

### `Org`

GitHub organization hosting the project. Either the org or login is required.

### `Login`

GitHub user account hosting the project. Either the org or login is required.

### `Repo`

GitHub repository hosting the project. This field is required.

### `Project`

The name of the Github project for which to retrieve the statics. This field is required.

### `Token`

The security token... TO DO:  Info.

Please do *not* store your secrets in plan text. Instead, use GitHub Secrets or a similar vault technology as shown in the example.

## Outputs

### `Summary`

The Summary output contains all of the per-column counts including:

- Total cards per column
- Cards per assignee per column
- Cards per label per column
- Issue-based cards per column
  
## Example usage

The following shows a configuration for the repo (i.e., <https://github.com/dmckinstry/ProjectSummary>) and a project named `ProjectSummaryTest`:

``` YAML
uses: dmckinstry/ProjectSummary@v1
with:
  login: 'dmckinstry'
  repo: 'ProjectSummary'
  project: 'ProjectSummaryTest'
  token: ${Some Secret value}
```

TO DO:

- Add docs on the security token
- Add output for the example
