const fs = require('fs');
const path = require('path');

try {
    const printPayloadInput = process.env.INPUT_PRINT_PAYLOAD || 'false';
    const shouldPrintPayload = printPayloadInput.trim().toLowerCase() === 'true';

    if (shouldPrintPayload) {
        const eventPath = process.env.GITHUB_EVENT_PATH;

        if (!eventPath) {
            throw new Error('GITHUB_EVENT_PATH environment variable is not set.');
        }

        const resolvedEventPath = path.resolve(eventPath);

        if (!fs.existsSync(resolvedEventPath)) {
            throw new Error(`Event payload file not found at path: ${resolvedEventPath}`);
        }

        const payload = JSON.parse(fs.readFileSync(resolvedEventPath, 'utf8'));
        console.log(`The event payload: ${JSON.stringify(payload, null, 2)}`);
    }

} catch (error) {

    console.error(error.message);
    process.exitCode = 1;

}
