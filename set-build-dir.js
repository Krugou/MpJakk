const {execSync} = require('child_process');

// Get the current branch name
const branchName = execSync('git rev-parse --abbrev-ref HEAD')
  .toString()
  .trim();
console.log(`Current branch name: ${branchName}`);
// Set the build directory name based on the branch name
let buildDirName;
if (branchName === 'main') {
  buildDirName = 'build';
} else {
  buildDirName = `mpjakkpages/${branchName}`;
}

// Update the "build" field in package.json
const fs = require('fs');
let packageJson;
try {
  packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
} catch (err) {
  console.error(`Error reading package.json file: ${err}`);
  process.exit(1);
}
packageJson.scripts.buildBranch = `set BUILD_PATH=${buildDirName} &&  react-scripts build`;
fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
