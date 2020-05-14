// Use Extension
const { configure, dependency, library, kit, action } = require("./ext");

// Use Kit
const { resolve, verify, clean, remove } = kit;

// Use Action
const { pathers, migrate, launcher, clone, generate } = action;

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
    const spinner = await launcher("fetching remote template ...");

    // Remove Template Cache
    if (verify(tmp)) {
      remove(tmp);
    }

    // Clone Repo
    await clone(repo, tmp, () => spinner.stop());

    // Inject `tmp` into `files`
    await generate(files, { dir: tmp, dip: "" });

    // Inject `gener` into `files`
    await generate(files, { dir: gener, dip: "" });
  });
};
