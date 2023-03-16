/**
 * This script is used to set the build directory name based on the branch name.
 * It also updates the title tag in public/index.html file and adds a link to the
 * deployment in README.md file.
 *
 * @author Aleksi Nokelainen
 * @version 1.0.5
 * @license MIT
 *
 *
 */
// this script uses branch names as name for paths if its not executed in git repo it will fail

const {execSync} = require('child_process');
const fs = require('fs');
const path = require('path');

// Get the current branch name
const branchName = execSync('git rev-parse --abbrev-ref HEAD')
  .toString()
  .trim();
console.log(`Current branch name: "${branchName}"`);

// custom paths:

// choose your own nickname
const nickName = 'aleksino';
// choose the folder name for the deployment folder
const deploymentFolder = 'mpjakk';
// choose the root path for the deployment
const rootPath = 'https://users.metropolia.fi';
// choose the folder name for the build folder
const buildFolder = 'mpjakkpages';

// script handles rest of the paths
const deploymentUrl = `~${nickName}/${deploymentFolder}`;

// Set the build directory name based on the branch name
let buildDirName;
// if is main or master branch, then build folder is build else it is buildFolder/branchName
if (branchName === 'main' || branchName === 'master') {
  buildDirName = 'build';
} else {
  buildDirName = `${buildFolder}/${branchName}`;
}

// Read the contents of the public/index.html file
fs.readFile('index.html', 'utf8', (err, data) => {
  if (err) throw err;
  const titleContent = `Branch: ${branchName} :)`;
  // Replace the title tag with the branchname variable
  const updatedData = data.replace(
    /<title>.*<\/title>/,
    `<title>${titleContent}</title>`
  );

  // Write the updated contents back to the public/index.html file
  fs.writeFile('index.html', updatedData, 'utf8', (err) => {
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
packageJson.scripts.buildBranch = `vite build --base ${deploymentUrl}/${branchName}/ --outDir ${buildDirName}`;
packageJson.scripts.addpush = `git add . && git commit -m 'update ${branchName}' && git push origin ${branchName} `;
packageJson.scripts.deploy = `git checkout main && git pull origin main && git merge ${branchName} && git add . && git commit -m 'Merge ${branchName} into main' && git push origin main && git checkout ${branchName}`;
fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));

// Generate link to deployment
const link = `${rootPath}/${deploymentUrl}/${branchName}`;

// Write link to README.md
const readmePath = './README.md';
const readmeContent = fs.readFileSync(readmePath, 'utf8');
const lines = readmeContent.split('\n');

lines[2] = `## branchName: ${branchName}`;
lines[6] = `## Custom path for this branch `;
lines[8] = `DeploymentFolder: ${deploymentFolder}`;
lines[9] = `Nickname: ${nickName}`;
lines[10] = `RootPath: [${rootPath}](${rootPath})`;
lines[11] = `BuildFolder: ${buildFolder}`;
lines[12] = `DeploymentUrl: ${deploymentUrl}`;
lines[13] = `BuildDirName: ${buildDirName}`;
lines[14] = `Link: [${link}](${link})`;

lines[4] = `Open link in browser [${link}](${link})`;

fs.writeFileSync(readmePath, lines.join('\n'));
console.log('Link added to README.md');
