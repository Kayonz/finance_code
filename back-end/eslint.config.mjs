import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs}"]},
  {
    languageOptions: { globals: globals.node },
    rules: {
      "semi": ["error", "always"],
      "no-extra-parens": ["error"],
    }
  },
  pluginJs.configs.recommended,
];

