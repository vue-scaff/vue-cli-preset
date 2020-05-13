// Use Library
const {
  fs,
  path,
  binary,
  glob,
  rimraf,
  ora,
  download,
  home,
  root,
} = require("./library");

/**
 * Foreach
 * ======== ======== ========
 * @param source {json}
 * @param callback {function}
 * ======== ======== ========
 */
function foreach(source, callback = () => {}) {
  // No Source
  if (source === undefined) {
    return console.error("please enter param.");
  }
  // No Call
  if (callback.constructor !== Function) {
    return console.error("callback must be a function.");
  }
  // Array
  if (source.constructor === Array) {
    return source.map((value, index) => callback(value, index));
  }
  // Any (Json)
  return Object.keys(source).map((key) => callback(source[key], key));
}

/**
 * Resolve Path
 * ======== ======== ========
 * @param dir {string}
 * ======== ======== ========
 */
function resolve(dir, pre = root) {
  // Connection Path
  return path.resolve(pre, dir);
}

/**
 * Join Path
 * ======== ======== ========
 * @param dir {string}
 * ======== ======== ========
 */
function join(dir, pre = home) {
  // Connection Path
  return path.join(pre, dir);
}

/**
 * File Read
 * ======== ======== ========
 * @param file {string}
 * ======== ======== ========
 */
function read(file, encode = "utf-8") {
  // Read Sync
  return fs.readFileSync(file, encode);
}

/**
 * Path Base
 * ======== ======== ========
 * @param file {string}
 * ======== ======== ========
 */
function base(file) {
  // Read Sync
  return path.basename(file);
}

/**
 * Clean File
 * ======== ======== ========
 * @param files {string}
 * ======== ======== ========
 */
function clean(files) {
  // Foreach
  foreach(files, (name) => delete files[name]);
}

/**
 * Verify
 * ======== ======== ========
 * @param dir {string}
 * ======== ======== ========
 */
function verify(dir) {
  // Verify Directory
  return fs.existsSync(dir);
}

/**
 * Remove
 * ======== ======== ========
 * @param dir {string}
 * ======== ======== ========
 */
function remove(dir) {
  try {
    rimraf.sync(dir);
  } catch (e) {
    console.error(e);
  }
}

/**
 * Launcher
 * ======== ======== ========
 * @param message {string}
 * @param callback {function}
 * ======== ======== ========
 */
function launcher(message, callback) {
  // Set Instant
  const spinner = ora(message);

  // Start
  spinner.start();

  // Runner
  callback(() => spinner.stop());
}

/**
 * Binaural
 * ======== ======== ========
 * @param dir {string}
 * ======== ======== ========
 */
function binaural(dir) {
  // Check Binary
  return binary.isBinaryFileSync(dir);
}

/**
 * Stuff
 * ======== ======== ========
 * @param dir {string}
 * @param callback {function}
 * ======== ======== ========
 */
function stuff(dir, callback) {
  // Use Glob
  glob
    // Check Directory
    .sync("**/*", {
      cwd: dir,
      nodir: true,
    })
    // Mapping Raw
    .forEach((raw) => callback(raw));
}

// Export
module.exports = {
  foreach,
  resolve,
  read,
  base,
  join,
  clean,
  verify,
  remove,
  launcher,
  binaural,
  stuff,
  download,
};
