module.exports = {
  default: {
    require: ["test/acceptance/features/steps/*.ts"],
    requireModule: ["ts-node/register"],
    paths: ["test/acceptance/features/**/*.{feature,feature.md}"],
  },
};
