// Use Extension
const { configure, dependency, library, kit, action } = require("./ext");

// Use Kit
const { clean, launcher, remove } = kit;

// Use Action
const { pathers, migrate, clone, generate } = action;
//
// // File System
// const fs = require("fs");
//
// // File Path
// const path = require("path");
//
// // File is Binary
// const binary = require("isbinaryfile");
//
// // Glob
// const glob = require("glob");
//
// // Rim Raf
// const rimraf = require("rimraf");
//
// // Console
// const ora = require("ora");
//
// // Home Process
// const home = require("user-home");
//
// // Download Repo
// const download = require("download-git-repo");
//
// // Root Common
// const common = path.resolve(__dirname, `./template/common`);

// /**
//  * Generate Project
//  * ======== ======== ========
//  * @param dir {string}
//  * @param files {array}
//  * @param base {string}
//  * @param rootOptions {json}
//  * ======== ======== ========
//  */
// async function generate(
//   // Direct
//   dir,
//   // Files
//   files,
//   // Base
//   base = "",
//   // Root Options
//   rootOptions = {}
// ) {
//   glob
//     // Check Files
//     .sync("**/*", {
//       cwd: dir,
//       nodir: true,
//     })
//     // Map Paths
//     .forEach((rawPath) => {
//       // Source Path
//       const sourcePath = path.resolve(dir, rawPath);
//       // File Name
//       const filename = path.join(base, rawPath);
//
//       // Is Binary
//       if (binary.sync(sourcePath)) {
//         // Binary File
//         files[filename] = fs.readFileSync(sourcePath);
//         // Return Buffer
//         return;
//       }
//
//       // Read File Content
//       let content = fs.readFileSync(sourcePath, "utf-8");
//
//       // Read Manifest
//       if (path.basename(filename) === "manifest.json") {
//         // Replace Manifest with Root Options
//         content = content.replace("{{name}}", rootOptions.projectName || "");
//       }
//
//       // Filename _
//       if (filename.charAt(0) === "_") {
//         // Files Prefix
//         let prefix = `${filename.charAt(1) === "_" ? "" : "."}`;
//         // Files Name
//         let name = `${filename.slice(1)}`;
//
//         // Assignment
//         files[`${prefix}${name}`] = content;
//
//         // Return Specials
//         return;
//       }
//
//       // Normal
//       files[filename] = content;
//     });
// }

// /**
//  * Pathers
//  * ======== ======== ========
//  * @param git {string}
//  * @param template {string}
//  * @param base {string}
//  * @param common {string}
//  * ======== ======== ========
//  */
// async function pathers(
//   // Gitlab
//   git,
//   // Choice
//   template,
//   // Basic
//   base = `src`
// ) {
//   // Address
//   git = `direct:http://${git}/archive`;
//   // Contains
//   const repo = `${git}/${template}.git`;
//   // Tmp
//   const tmp = path.join(
//     home,
//     ".vue-scaff/templates",
//     template.replace(/[/:]/g, "-")
//     // base
//   );
//   // Return
//   return {
//     repo,
//     base,
//     tmp,
//   };
// }

// /**
//  * Move
//  * ======== ======== ========
//  * @param files {json}
//  * @param dir {string}
//  * ======== ======== ========
//  */
// async function move(files = {}, dir = common) {
//   // Set Json
//   const json = {};
//   // Transfer Files
//   Object.keys(files).forEach((name) => {
//     json[`./${name}`] = `${dir}/${name}`;
//   });
//   // Return
//   json;
// }

// Exports
module.exports = (api, options, rootOptions) => {
  // Preparations
  api.extendPackage((pkg) => dependency);

  // Render Template
  api.render(async function (files) {
    // Clean Files
    clean(files);

    // Get Pathers
    const { repo, gener, tmp } = await pathers(options, configure);

    // Launcher of Start
    launcher("fetching remote template ...", async (next) => {
      // Remove Template Cache
      remove(tmp);

      // Clone Repo
      await clone(repo, tmp, next);

      // Inject `tmp` into `files`
      await generate(files, { dir: tmp, dip: "" });

      // Inject `gener` into `files`
      await generate(files, { dir: gener, dip: "" });
    });

    // Fetching Template
    // const spinner = ora("fetching ...");
    // spinner.start();

    // Rim Raf
    // if (fs.existsSync(tmp)) {
    //   try {
    //     rimraf.sync(tmp);
    //   } catch (e) {
    //     console.error(e);
    //   }
    // }

    // Download Repo
    // await new Promise((resolve, reject) => {
    //   // Download
    //   download(repo, tmp, { clone: true }, (err) => {
    //     // Spinner Stop
    //     spinner.stop();
    //     // Throw Error
    //     if (err) {
    //       return reject(err);
    //     }
    //     // Resolve
    //     resolve();
    //   });
    // });

    // Finally
    // await generate(files, tmp /* base */);
    //
    // // Generate - CP: dcloudio/uni-preset-vue
    // await generate(files, common);
  });

  // Supplement Files
  api.render(
    // Collections
    migrate([
      "readme.md",
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
