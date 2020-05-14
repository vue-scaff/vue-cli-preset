// Use Kit
const {
  foreach,
  resolve,
  read,
  base,
  join,
  clean,
  verify,
  remove,
  binaural,
  stuff,
  ora,
  download,
} = require("./kit");

/**
 * Pathers
 * ======== ======== ========
 * @param options {json} - Options in Prompts
 * ======== ======== ========
 */
async function pathers({ template }, { git, common, sniper }) {
  // Git Repo -- `vue-scaff/vue-cli-preset`
	const repo = `direct:https://github.com/${git}.git`

  // Template Common in Preset
  const gener = resolve(common);

  // Temporary Directory -- Replace 4 What ?
  const tmp = join(`${sniper}/${template.replace(/[/:]/g, "-")}`);

  // Return
  return {
    repo,
    gener,
    tmp,
  };
}

/**
 * Migrate
 * ======== ======== ========
 * @param files {json}
 * @param pre {string}
 * ======== ======== ========
 */
async function migrate(files, names, common) {
  // Read Files
  foreach(names, (dir, name) => {
		// Read File
		files[name] = read(dir);
	});
}

/**
 * Launcher
 * ======== ======== ========
 * @param message {string}
 * @param callback {function}
 * ======== ======== ========
 */
async function launcher(message) {
  // Set Instant
  const spinner = ora(message);

  // Start
  spinner.start();

  // Return
  return spinner;
}

/**
 * Clone
 * ======== ======== ========
 * @param repo {string}
 * @param local {string}
 * ======== ======== ========
 */
async function clone(repo, local, next) {
  // Use Promise
  await new Promise((resolve, reject) => {
    // Use Download
    download(repo, local, { clone: true }, (e) => {
      // Spinner Stop
      next();

      // Error Hand
      if (e) {
        return reject(e);
      }

      // Resolve
      resolve();
    });
  });
}

/**
 * Glitter
 * ======== ======== ========
 * @param pathy {json}
 * @param callback {function}
 * ======== ======== ========
 */
async function glitter({ dir, dip }, callback) {
  // Use Stuff
  stuff(dir, (raw) => {
    // Set Path
    const pathy = {
      // Source
      source: resolve(raw, dir),
      // File
      filename: join(raw, dip),
    };

    // Each Runner
    callback(read(pathy.source, true), pathy);
  });
}

/**
 * Generate
 * ======== ======== ========
 * @param files {json}
 * @param pathy {json}
 * @param options {json} -- rootOptions
 * ======== ======== ========
 */
async function generate(files, pathy, options) {
  // Use Glitter
  await glitter(pathy, (content, { source, filename }) => {
    // Check Binary
    if (binaural(source)) {
      // Set Binary to Files
      files[filename] = read(source);

      // Return Buffer
      return;
    }

    // Filename Cap is `_`
    if (filename.charAt(0) === "_") {
      // Files Prefix
      let prefix = `${filename.charAt(1) === "_" ? "" : "."}`;
      // Files Name
      let name = `${filename.slice(1)}`;

      // Assignment
      files[`${prefix}${name}`] = content;

      // Return Specials
      return;
    }

    // Normal
    files[filename] = content;
  });
}

// Export
module.exports = {
  pathers,
  migrate,
  launcher,
  clone,
  glitter,
  generate,
};
