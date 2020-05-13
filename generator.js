// Use Extension
const { configure, dependency, library, kit, action } = require("./ext");

// Use Kit
const { verify, clean, launcher, remove } = kit;

// Use Action
const { pathers, migrate, clone, generate } = action;

// Exports
module.exports = (api, options, rootOptions) => {
  // Preparations
  api.extendPackage((pkg) => dependency);

  // Render Template
  api.render(async function (files) {
    // Clean Files Cache
    clean(files);

    // Get Pathers
    const { repo, gener, tmp } = await pathers(options, configure);

    // Launcher of Start
    launcher("fetching remote template ...", async (next) => {
      // Remove Template Cache
      if (verify(tmp)) {
        remove(tmp);
      }

      // Clone Repo
      await clone(repo, tmp, next);

      // Inject `tmp` into `files`
      await generate(files, { dir: tmp, dip: "" });

      // Inject `gener` into `files`
      await generate(files, { dir: gener, dip: "" });
    });
  });

  // Supplement Files
  api.render(
    // Collections
    migrate([
      "README.md",
      ".browserslistrc",
      ".eslintrc.js",
      ".gitignore",
      "injection.json",
      "jest.config.js",
      "postcss.config.js",
      "vue.config.js",
    ])
  );
};
