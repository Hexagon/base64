import esbuild from "esbuild";
import { dtsPlugin } from "esbuild-plugin-d.ts";
import { dirname, fromFileUrl, resolve } from "@std/path";
import { cp, isDir, isFile, readFile, rm, rmdir, writeFile } from "@cross/fs";

const baseRelativeProjectRoot = "../"; // Where is this script located relative to the project root
const outputFolder = "dist";
const currentScriptDir = dirname(fromFileUrl(import.meta.url));
const relativeProjectRoot = resolve(currentScriptDir, baseRelativeProjectRoot);
const resolvedDistPath = resolve(relativeProjectRoot, outputFolder);
const resolvedNodeModulesPath = resolve(relativeProjectRoot, "node_modules");
const resolvedPackageJsonPath = resolve(relativeProjectRoot, "package.json");
const resolvedDenoConfigPath = resolve(relativeProjectRoot, "deno.json");

/* - Base esbuild configuration */
const baseConfig = {
  entryPoints: [resolve(relativeProjectRoot, "src", "base64.ts")],
  bundle: true,
  minify: true,
  sourcemap: false,
  plugins: [dtsPlugin({
    tsconfig: {
      declarations: true,
      compilerOptions: {
        //@ts-ignore outDir is valid
        outDir: resolvedDistPath,
      },
    },
  })],
};

/* - All esbuild targets */
const buildConfigs = [
  {
    ...baseConfig,
    outfile: resolve(resolvedDistPath, "base64.cjs"),
    platform: "node",
    format: "cjs",
  },
  {
    ...baseConfig,
    outfile: resolve(resolvedDistPath, "base64.umd.js"),
    platform: "browser",
    format: "iife",
    globalName: "base64",
  },
  {
    ...baseConfig,
    outfile: resolve(resolvedDistPath, "base64.js"),
    platform: "neutral",
    format: "esm",
  },
];

/* Base package.json (name and version will be transfered from deno.json) */
const basePackageJson = {
  description: "Base64 and base64url to string or arraybuffer, and back. Node, Deno or browser.",
  author: "Hexagon <github.com/hexagon>",
  contributors: [
    {
      name: "Niklas von Hertzen",
      email: "niklasvh@gmail.com",
      url: "https://hertzen.com",
    },
  ],
  homepage: "https://base64.56k.guru",
  repository: {
    type: "git",
    url: "https://github.com/hexagon/base64",
  },
  bugs: {
    url: "https://github.com/hexagon/base64/issues",
  },
  files: [
    "dist/*",
    "SECURITY.md",
  ],
  keywords: [
    "base64",
    "base64url",
    "parser",
    "isomorphic",
    "arraybuffer",
    "string",
  ],
  type: "module",
  main: "./dist/base64.cjs",
  browser: "./dist/base64.umd.js",
  module: "./dist/base64.js",
  types: "./dist/base64.d.ts",
  exports: {
    "./package.json": "./package.json",
    ".": {
      import: { "default": "./dist/base64.js", "types": "./dist/base64.d.ts" },
      require: { "default": "./dist/base64.cjs", "types": "./dist/base64.d.cts" },
      browser: "./dist/base64.umd.js",
    },
  },
  license: "MIT",
};

async function clean() {
  if (await isDir(resolvedDistPath)) {
    await rmdir(resolvedDistPath, {
      recursive: true,
    });
  }
  if (await isDir(resolvedNodeModulesPath)) {
    await rmdir(resolvedNodeModulesPath, {
      recursive: true,
    });
  }
  if (await isFile(resolvedPackageJsonPath)) {
    await rm(resolvedPackageJsonPath);
  }
}

// Function to build with esbuild
async function build() {
  try {
    //@ts-ignore No need to worry about config errors
    await Promise.all(buildConfigs.map((config) => esbuild.build(config)));
    // Copy .d.ts to .d.cts
    await cp(resolve(resolvedDistPath, "base64.d.ts"), resolve(resolvedDistPath, "base64.d.cts"));
  } catch (error) {
    console.error("Build failed:", error);
  }
}

async function generatePackageJson() {
  // Read deno.json
  const denoConfig = JSON.parse(
    new TextDecoder().decode(await readFile(resolvedDenoConfigPath)),
  ) as { name: string; version: string };

  // Define package.json template
  const packageJson = {
    ...basePackageJson,
    name: denoConfig.name,
    version: denoConfig.version,
  };

  // Write package.json
  await writeFile(
    resolvedPackageJsonPath,
    new TextEncoder().encode(JSON.stringify(packageJson, undefined, 2)),
  );

  console.log("package.json has been generated successfully.");
}

if (Deno.args[1] === "clean") {
  await clean();
} else if (Deno.args[1] === "build") {
  await build();
} else if (Deno.args[1] === "package") {
  await generatePackageJson();
}
