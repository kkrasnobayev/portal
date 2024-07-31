var writeFile = require('fs').writeFile;

/**
 * Dynamically inject Angular environment variables.
 *
 * Options:
 *     --useEnvVars
 *         Default: true
 *         Use machine environment variables. Environment variables must be
 *         uppercased and prefixed with `PFM_UI_`.
 *     --[key] [value]
 *         Use CLI argument key-value pairs. Keys must be camelcased. Keys are
 *         transformed, i.e. --trackingKey == PFM_UI_TRACKING_KEY.
 *
 *         When --useEnvVars is used along with CLI arguments, the CLI
 *         arguments override environment variables of the same name.
 *
 *         When multiple CLI arguments with the same key are provided, the last
 *         value is used.
 * 	   --enableLogging
 *         Default: false
 *         Output logs to console. Won't see environment variable values.
 *     --enableSensitiveDataLogging
 *         Default: false
 *         Output logs to console with environment variable values.
 *     --outputDir
 *         Default: ./src/assets
 *         Directory to output `env.js` to. Trailing slash not required.
 *
 * Example: Use machine environment variables
 *     node ./env-config.js --useEnvVars
 *
 * Example: Override `trackingKey` environment variable with CLI argument
 *     node ./env-config.js --useEnvVars --trackingKey abcd1234
 */
const ngVars = [
	'audience',
	'clientId',
	'domain',
	'environment',
	'loggedOutUri',
	'redirectUri',
	'omHomeUri',
	'essentialsHomeUri'
];

let enableLogging = false;
let enableSensitiveDataLogging = false;
let outputDir = './public';
let useEnvVars = true;

const cliVars = {};
for (let i = 0; i < process.argv.length; i++) {
	const key = process.argv[i].substr(2);
	const val = i < process.argv.length + 1 ? process.argv[i + 1] : null;

	if (key === 'enableLogging') {
		enableLogging = true;
	}

	if (key === 'enableSensitiveDataLogging') {
		enableSensitiveDataLogging = true;
	}

	if (key === 'useEnvVars' && !val) {
		useEnvVars = false;
	}

	if (key === 'outputDir') {
		outputDir = val;
	}

	if (ngVars.includes(key)) {
		cliVars[key] = val;
	}
}

if (outputDir.slice(-1) !== '/') {
	outputDir += '/';
}

if (enableSensitiveDataLogging) {
	enableLogging = true;
}

// Wrappers to enable/disable logging to console
const log = (...args) => {
	if (enableLogging && !enableSensitiveDataLogging) {
		console.log(...args);
	}
};
const logSensitive = (...args) => {
	if (enableSensitiveDataLogging) {
		console.log(...args);
	}
};

log('Angular environment variables: ', ngVars);
log('Logging enabled: ', enableLogging);
log('Sensitive data logging enabled: ', enableSensitiveDataLogging);
log('Use environment variables: ', useEnvVars);

const envVars = {};
if (useEnvVars) {
	const transformedVars = ngVars.map((key) => {
		const snakeCase = key.replace(/[A-Z]/g, (m) => `_${m}`);
		const upperCase = `ASCENT_PORTAL_${snakeCase}`.toUpperCase();

		log(`Mapped Angular env var ${key} to machine env var ${upperCase}`);

		return upperCase;
	});

	ngVars.forEach((key, index) => {
		const envValue = process.env[transformedVars[index]];
		if (envValue) {
			envVars[key] = envValue;
		}
	});

	logSensitive('Environment variables captured: ', envVars);
	log('Environment variables captured: ', Object.keys(envVars));
}

logSensitive('CLI variables captured: ', cliVars);
log('CLI variables captured: ', Object.keys(cliVars));

const windowVars = Object.assign({}, envVars, cliVars);
const fileData = `(function (window) { window.ASCENTPORTAL = ${JSON.stringify(windowVars)}; } (this));`;

logSensitive('Created file data: ', fileData);
log('Created file data');

envPath = `${outputDir}env.js`;

logSensitive('Writing file data to path: ', envPath);
log('Writing file data to path');

writeFile(envPath, fileData, 'utf8', function (err) {
	// Always log error
	if (err) return console.log(err);
});
