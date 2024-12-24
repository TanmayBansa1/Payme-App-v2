import { config } from "@repo/eslint-config/react-internal";

/** @type {import("eslint").Linter.Config} */
export const config = {
    ...config,
    rules: {
        ...config.rules,
        "@typescript-eslint/no-explicit-any": "off",
    }
}
export default config;
