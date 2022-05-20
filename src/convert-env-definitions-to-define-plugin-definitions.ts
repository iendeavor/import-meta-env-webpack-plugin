import { WebpackError } from "webpack";

type definitions = Record<string, any>;

const convertEnvDefinitionsToDefinePluginDefinitions = (
  definitions: Record<string, any>
): [definitions, WebpackError[]] => {
  const result: Record<string, any> = {};
  const errors: WebpackError[] = [];

  for (const key in definitions) {
    const value = process.env[key] ?? definitions[key];

    if (value === undefined) {
      errors.push(
        new WebpackError(
          [
            `ImportMetaEnvWebpackPlugin - ${key} environment variable is undefined`,
            "",
            "You can pass an object with default values to suppress this warning.",
            "See https://github.com/iendeavor/import-meta-env-webpack-plugin#readme for example.",
          ].join("\n")
        )
      );
    }

    result[`import.meta.env.${key}`] = JSON.stringify(value);
  }

  return [result, errors];
};

export default convertEnvDefinitionsToDefinePluginDefinitions;
