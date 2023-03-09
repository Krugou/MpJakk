const {execSync} = require('child_process');
const fs = require('fs');

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
