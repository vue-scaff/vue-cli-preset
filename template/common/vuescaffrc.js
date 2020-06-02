/**
 * 1. `suffix` do not work
 * ======== ======== ========
 */

module.exports = {
  main: {
    app: `/App.vue`
  },

  registry: {
    host: true,
    api: true,
    route: true,
    store: true,
    mixin: true
  },

  extract: {
    util: {
      context: `@/utils`,
      suffix: /.js$/
    },

    route: {
      context: `@/pages`,
      suffix: /\S+\/route.js$/
    },

    store: {
      context: `@/pages`,
      suffix: /\S+\/store.js$/
    },

    component: {
      context: `@/components`,
      suffix: /.vue$/
    },

    filter: {
      context: `@/filters`,
      suffix: /.js$/
    },

    style: {
      context: `@/sheet`,
      suffix: /variables.scss$/
    },

    i18n: {
      context: `@/i18n`,
      suffix: /.js$/
    }
  }
};
