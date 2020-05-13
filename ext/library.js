// File System
const fs = require("fs");

// File Path
const path = require("path");

// File is Binary
const binary = require("isbinaryfile");

// Glob
const glob = require("glob");

// Rim Raf
const rimraf = require("rimraf");

// Console
const ora = require("ora");

// Download Repo
const download = require("download-git-repo");

// Home Process
const home = require("user-home");

// Root
const root = path.resolve(__dirname, "..");

// Export
module.exports = {
  fs,
  path,
  binary,
  glob,
  rimraf,
  ora,
  download,
  home,
  root,
};
