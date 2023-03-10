const {execSync} = require('child_process');
const fs = require('fs');
const path = require('path');
// Get the current branch name
const branchName = execSync('git rev-parse --abbrev-ref HEAD')
  .toString()
  .trim();
console.log(`Current branch name: "${branchName}"`);

// Set the build directory name based on the branch name
let buildDirName;
if (branchName === 'main') {
  buildDirName = 'build';
} else {
  buildDirName = `mpjakkpages/${branchName}`;
}

// Read the contents of the public/index.html file
fs.readFile('public/index.html', 'utf8', (err, data) => {
  if (err) throw err;

  // Replace the title tag with the branchname variable
  const updatedData = data.replace(
    /<title>.*<\/title>/,
    `<title>${branchName}</title>`
  );

  // Write the updated contents back to the public/index.html file
  fs.writeFile('public/index.html', updatedData, 'utf8', (err) => {
    if (err) throw err;
    console.log('index.html file updated successfully');
  });
});
// Update the "build" field in package.json
let packageJson;
try {
  packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
} catch (err) {
  console.error(`Error reading package.json file: ${err}`);
  process.exit(1);
}
packageJson.scripts.buildBranch = `set BUILD_PATH=${buildDirName}&&  react-scripts build`;
fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));

// Generate link to deployment
const link = `https://users.metropolia.fi/~aleksino/mpjakk/${branchName}`;

// Write link to README.md
const readmePath = './README.md';
const readmeContent = fs.readFileSync(readmePath, 'utf8');
const lines = readmeContent.split('\n');
if (lines.length < 13) {
  console.error('README.md file does not contain expected number of lines');
  process.exit(1);
}
lines[12] = `Open link in browser [${link}](${link})`;
fs.writeFileSync(readmePath, lines.join('\n'));
console.log('Link added to README.md');
