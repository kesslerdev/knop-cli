const inflection = require("inflection");

const params = ({ args }) => {
  const packageName = inflection.dasherize(inflection.underscore(args.name));

  return {
    packageName,
    orgName: args.org || inflection.titleize(args.name),
    repo:
      args.repo ||
      "https://https://outils.docapost.tech/gitlab/docaposte/kubernetes/operators/" +
        packageName,
    dockerRepo:
      args.dockerRepo || "docker.docapost.tech/docaposte/" + packageName
  };
};

module.exports = {
  prompt: ({ prompter, args }) => {
    if (args.name && !args.prompt) {
      return Promise.resolve(params({ args }));
    }

    return prompter
      .prompt([
        {
          type: "input",
          name: "name",
          message: "whats your operator name?"
        },
        ...(args.prompt
          ? [
              {
                type: "input",
                name: "repo",
                message:
                  "whats your operator repository ? (including .git suffix)"
              },
              {
                type: "input",
                name: "dockerRepo",
                message: "whats your operator docker repository ?"
              }
            ]
          : [])
      ])
      .then(answers => {
        return params({ args: answers });
      });
  }
};
