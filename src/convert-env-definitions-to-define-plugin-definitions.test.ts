import { WebpackError } from "webpack";
import convertEnvDefinitionsToDefinePluginDefinitions from "./convert-env-definitions-to-define-plugin-definitions";

const OLD_ENV = process.env;

beforeEach(() => {
  jest.resetModules();
  process.env = { ...OLD_ENV };
});

afterAll(() => {
  process.env = OLD_ENV;
});

test("empty definitions", () => {
  const definitions = {};

  const result = convertEnvDefinitionsToDefinePluginDefinitions(definitions);

  expect(result).toEqual([{}, []]);
});

test("it should return an error if the environment variable is not defined", () => {
  const definitions = {
    FOO: undefined,
  };

  expect(convertEnvDefinitionsToDefinePluginDefinitions(definitions)).toEqual([
    {},
    [
      new WebpackError(
        [
          "ImportMetaEnvWebpackPlugin - FOO environment variable is undefined",
          "",
          "You can pass an object with default values to suppress this warning.",
          "See https://github.com/iendeavor/import-meta-env-webpack-plugin#readme for example.",
        ].join("\n")
      ),
    ],
  ]);
});

test("it should return the default value `null` if the environment variable is not defined", () => {
  const definitions = {
    FOO: null,
  };

  const result = convertEnvDefinitionsToDefinePluginDefinitions(definitions);

  expect(result).toEqual([
    {
      "import.meta.env.FOO": JSON.stringify(null),
    },
    [],
  ]);
});

test("it should return the default value `true` if the environment variable is not defined", () => {
  const definitions = {
    FOO: true,
  };

  const result = convertEnvDefinitionsToDefinePluginDefinitions(definitions);

  expect(result).toEqual([
    {
      "import.meta.env.FOO": JSON.stringify(true),
    },
    [],
  ]);
});

test("it should return the environment variable value if the environment variable is defined", () => {
  process.env.FOO = "bar";
  const definitions = {
    FOO: undefined,
  };

  const result = convertEnvDefinitionsToDefinePluginDefinitions(definitions);

  expect(result).toEqual([
    {
      "import.meta.env.FOO": JSON.stringify("bar"),
    },
    [],
  ]);
});

test("it should return stringified JSON", () => {
  process.env.FOO = "foo";
  const definitions = {
    FOO: undefined,
  };

  const result = convertEnvDefinitionsToDefinePluginDefinitions(definitions);

  expect(result).toEqual([
    {
      "import.meta.env.FOO": JSON.stringify("foo"),
    },
    [],
  ]);
});
