import { resolve, fromFileUrl, dirname  } from "@std/path";
import { rmdir } from "@cross/fs";
import { isDir } from "@cross/fs/stat";

const relativeProjectRoot = "../";
const outputFolder = "dist";

const currentScriptDir = dirname(fromFileUrl(import.meta.url));

const resolvedPath = resolve(currentScriptDir, relativeProjectRoot, outputFolder);

if (await isDir(resolvedPath)) {
    await rmdir(resolvedPath, {
        recursive: true,
        force: true
    });
}