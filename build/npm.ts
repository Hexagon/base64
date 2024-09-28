import { readJson, writeJson } from "https://deno.land/std/fs/mod.ts";

import { resolve, fromFileUrl, dirname  } from "@std/path";

const relativeProjectRoot = "../";

const currentScriptDir = dirname(fromFileUrl(import.meta.url));

const resolvedPath = resolve(currentScriptDir, relativeProjectRoot);

async function generatePackageJson() {

  // Read deno.json
  const denoConfigPath = resolve(resolvedPath, "deno.json");
  const denoConfig = await readJson(denoConfigPath) as { name: string; version: string };

  // Define package.json template
  const packageJson = {
    name: denoConfig.name,
    version: denoConfig.version,
    description: "Base64 and base64url to string or arraybuffer, and back. Node, Deno or browser.",
    author: "Hexagon <github.com/hexagon>",
    contributors: [
      {
        name: "Niklas von Hertzen",
        email: "niklasvh@gmail.com",
        url: "https://hertzen.com"
      }
    ],
    homepage: "https://base64.56k.guru",
    repository: {
      type: "git",
      url: "https://github.com/hexagon/base64"
    },
    bugs: {
      url: "https://github.com/hexagon/base64/issues"
    },
    files: [
      "dist/*",
      "SECURITY.md"
    ],
    keywords: [
      "base64",
      "base64url",
      "parser",
      "base64",
      "isomorphic",
      "arraybuffer",
      "string"
    ],
    type: "module",
    main: "./dist/base64.cjs",
    browser: "./dist/base64.umd.js",
    module: "./dist/base64.js",
    types: "./dist/base64.d.ts",
    exports: {
      ".": {
        import: "./src/base64.js",
        require: "./dist/base64.cjs.js",
        browser: "./dist/base64.umd.js"
      }
    },
    license: "MIT"
  };

  // Write package.json
  const packageJsonPath = resolve(resolvedPath, "package.json");
  await writeJson(packageJsonPath, packageJson, { spaces: 2 });

  console.log("package.json has been generated successfully.");
}

await generatePackageJson();