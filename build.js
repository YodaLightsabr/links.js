#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const packageJson = require('./package.json');
const { exec } = require('child_process');

const execPromise = (command, options) => new Promise((resolve, reject) => exec(command, options, (err, stdout, stderr) => {
    if (err) return reject(err);
    resolve({ stdout, stderr });
}));

(async () => {
    await execPromise('rm -rf dist && cp -r src dist');
    const webBuild = `/**
*   links.js web build v${packageJson.version}
*   MIT License
*/
((module = { exports: {} }, platform = 'web') => {
${fs.readFileSync(path.join(__dirname, 'dist/links.js'), 'utf8')}
window.linksjs = module.exports;
})();`;
    const nodeBuild = `/**
*   links.js nodejs build v${packageJson.version}
*   MIT License
*/
var platform = 'node';
${fs.readFileSync(path.join(__dirname, 'dist/links.js'), 'utf8')}`;
    fs.writeFileSync(path.join(__dirname, 'dist/web.js'), webBuild);
    fs.writeFileSync(path.join(__dirname, 'dist/node.js'), nodeBuild);
})();