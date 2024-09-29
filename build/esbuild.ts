import esbuild from "esbuild";
import { dtsPlugin } from "esbuild-plugin-d.ts";
import { exit } from "@cross/utils";
import { dirname, fromFileUrl, resolve } from "@std/path";

let relativeProjectRoot = "../";
const outputFolder = "dist";

const currentScriptDir = dirname(fromFileUrl(import.meta.url));
relativeProjectRoot = resolve(currentScriptDir, relativeProjectRoot);

const tsConfig = {
    declaration: true,
    compilerOptions: {
        rootDir: resolve(relativeProjectRoot, "src"),
        outDir: resolve(relativeProjectRoot, "dist")
    }
};

const dtsPluginInstance = dtsPlugin({
    tsconfig: tsConfig
});

// Function to build with esbuild
async function build() {
  // CommonJS build
  await esbuild.build({
    entryPoints: [resolve(relativeProjectRoot, 'src/base64.ts')],
    outfile: resolve(relativeProjectRoot, outputFolder, 'base64.cjs'),
    bundle: true,
    platform: 'node',
    format: 'cjs',
    sourcemap: false,
    plugins: [ dtsPluginInstance ]
  });

  // UMD build
  await esbuild.build({
    entryPoints: [resolve(relativeProjectRoot, 'src/base64.ts')],
    outfile: resolve(relativeProjectRoot, outputFolder, 'base64.umd.js'),
    bundle: true,
    platform: 'browser',
    format: 'iife',
    globalName: 'base64',
    sourcemap: false,
    plugins: [ dtsPluginInstance ]
  });

  // ESM build
  await esbuild.build({
    entryPoints: [resolve(relativeProjectRoot, 'src/base64.ts')],
    outfile: resolve(relativeProjectRoot, outputFolder, 'base64.js'),
    bundle: true,
    platform: 'neutral',
    format: 'esm',
    sourcemap: false,
    plugins: [ dtsPluginInstance ]
  });

}

// Run the build function
build().catch((error) => {
  console.error(error);
  exit(1);
});