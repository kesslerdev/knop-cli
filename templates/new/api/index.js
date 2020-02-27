const inflection = require("inflection");

module.exports = {
  params: ({ args }) => {
    if (!args.apiVersion || !args.kind) {
      throw new Error("--api-version && --kind are mandatory");
    }
    const s = args.apiVersion.split("/");
    const apiGroup = s[0];
    const version = s[1];
    return {
      ...args,
      apiGroup,
      version,
      crdPath: apiGroup + "_" + inflection.pluralize(args.kind.toLowerCase()),
      crdExamplePath:
        apiGroup + "_" + version + "_" + args.kind.toLowerCase() + "_cr"
    };
  }
};
