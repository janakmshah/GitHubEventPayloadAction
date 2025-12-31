# GitHub Event Payload Action

GitHub Event Payload Action conditionally prints the JSON payload for the event that triggered a workflow. Use it to quickly debug workflows by inspecting `GITHUB_EVENT_PATH` without adding custom scripting to each job.

## Inputs

| Name | Description | Required | Default |
| ---- | ----------- | -------- | ------- |
| `print-payload` | String value indicating whether to print the event payload. Accepts `"true"` or `"false"` (case-insensitive). | No | `false` |

## Behavior

- When `print-payload` resolves to `true`, the action reads the event payload file provided by the `GITHUB_EVENT_PATH` environment variable and logs the prettified JSON to the workflow run.
- If the event payload file is missing or unreadable, the action fails with a clear error message.
- When `print-payload` is `false`, the action exits without printing the payload.

## Usage

Add the action to a workflow job and toggle payload printing with the `print-payload` input. Setting the input to `true` is helpful while debugging and can be turned off later to reduce log noise.

```yaml
name: Print Event Payload

on: [push, pull_request]

jobs:
  show-payload:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Print GitHub event payload
        uses: ./
        with:
          print-payload: "true"
```

In this example, the action runs from the repository root (e.g., during local development of the action). To use the published version, replace `./` with the appropriate repository and version tag, such as `janakmshah/GitHubEventPayloadAction@v1`.

## Notes

- The action targets the Node 20 runtime as defined in [`action.yml`](action.yml).
- The `GITHUB_EVENT_PATH` environment variable is automatically provided by GitHub Actions during workflow execution; no additional setup is required.
