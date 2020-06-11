module.exports = template => {
  return {
    // Template Origin
    template: {
      // Repo
      git: `vue-scaff/vue-cli-template`,
      // Gener
      common: `./template/common`,
      // Tmp
      sniper: `.vue-scaff/templates`
    },
    // Template Admin
    admin: {
      // Repo
      git: `vue-scaff/vue-cli-admin`,
      // Gener
      common: `./template/common`,
      // Tmp
      sniper: `.vue-scaff/templates`
    }
  }[template];
};
