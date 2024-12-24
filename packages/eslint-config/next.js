import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginNext from "@next/eslint-plugin-next";

const nextJsConfig = {
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      ecmaFeatures: {
        jsx: true
      }
    },
    globals: {
      ...globals.browser,
      ...globals.node
    }
  },
  plugins: {
    "@typescript-eslint": tseslint.plugin,
    react: pluginReact,
    "react-hooks": pluginReactHooks,
    "@next/next": pluginNext
  },
  rules: {
    ...js.configs.recommended.rules,
    ...tseslint.configs.recommended.rules,
    ...pluginReact.configs.recommended.rules,
    ...pluginReactHooks.configs.recommended.rules,
    ...pluginNext.configs.recommended.rules,
    "react/react-in-jsx-scope": "off",
    "@next/next/no-html-link-for-pages": "off"
  }
};

export default nextJsConfig;
