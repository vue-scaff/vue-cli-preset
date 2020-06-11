module.exports = [
  {
    type: "list",
    name: "template",
    message: "please select a template: ",
    choices: [
      {
        name: "vue-scaff-template",
        value: "template"
      },
      {
        name: "vue-scaff-admin",
        value: "admin"
      }
    ],
    default: "None"
  }
];
