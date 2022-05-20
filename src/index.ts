import { DefinePlugin } from "webpack";
import normalizeDefinitions from "./normalize-definitions";
import convertEnvDefinitionsToDefinePluginDefinitions from "./convert-env-definitions-to-define-plugin-definitions";

import type { Compiler } from "webpack";

type Options = [string[] | Record<string, any>];

export class ImportMetaEnvWebpackPlugin {
  private definitions: Record<string, any>;

  constructor(...options: Options) {
    const [env] = options;

    if (Array.isArray(env)) {
      this.definitions = normalizeDefinitions(env);
    } else {
      this.definitions = env;
    }
  }

  apply(compiler: Compiler) {
    const [definePluginDefinitions, errors] =
      convertEnvDefinitionsToDefinePluginDefinitions(this.definitions);

    if (errors.length > 0) {
      compiler.hooks.thisCompilation.tap(
        "ImportMetaEnvWebpackPlugin",
        (compilation) => {
          compilation.errors.push(...errors);
        }
      );
    }

    new DefinePlugin(definePluginDefinitions).apply(compiler);
  }
}
