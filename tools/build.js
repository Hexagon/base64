import { build, emptyDir } from "@deno/dnt";

import packageJson from "../deno.json" assert { type: "json" }; 

await emptyDir("./npm");

await build({
  entryPoints: ["./src/base64.ts"],
  outDir: "./npm",
  shims: { deno: true },
  package: {
    // package.json properties
    name: packageJson.name,
    version: packageJson.version,
    description: "Base64 and base64url to string or arraybuffer, and back. Node, Deno or browser.",
    author: "Hexagon <github.com/hexagon>",
    homepage: "https://base64.56k.guru",
    repository: {
      "type": "git",
      "url": "https://github.com/hexagon/base64"
    },
    bugs: {
      "url": "https://github.com/hexagon/base64/issues"
    },
  },
  postBuild() {
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
    Deno.copyFileSync("SECURITY.md", "npm/SECURITY.md");
  },
  filterDiagnostic(diagnostic) {
    if (diagnostic.file?.fileName.includes("/src/deps/jsr.io")) {
      return false;
    }
    return true;
  }
});