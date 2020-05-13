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
  launcher,
  binaural,
  stuff,
  download,
} = require("./kit");

/**
 * Pathers
 * ======== ======== ========
 * @param options {json} - Options in Prompts
 * ======== ======== ========
 */
async function pathers({ template }, { git, common, sniper }) {
  // Git Repo -- `direct:https://github.com/vue-scaff/vue-cli-preset/`
  const repo = git;

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
async function migrate(files, pre, json = {}) {
  // Transfer Files
  foreach(files, (name) => (json[`./${name}`] = `${pre}/${name}`));

  // Return
  return await json;
}

/**
 * Clone
 * ======== ======== ========
 * @param repo {string}
 * @param local {string}
 * ======== ======== ========
 */
async function clone(repo, local, next) {
  // Use Download
  download(repo, local, { clone: true }, (e) => {
    // Error Hand
    if (e) {
      return console.error(e);
    }

    // Next
    next();
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
    callback(read(pathy.source), pathy);
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
  glitter(pathy, (content, { source, filename }) => {
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
  clone,
  glitter,
  generate,
};
