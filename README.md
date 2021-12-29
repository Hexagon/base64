<p align="center">
  <img src="/base64.png" alt="Croner" width="150" height="150"><br>
  Probably the only JavaScript base64 library you'll ever need.<br>
</p>

# @hexagon/base64

Base64 and base64url to string or arraybuffer, and back. In Node, Deno or browser.

[![Node.js CI](https://github.com/Hexagon/base64/actions/workflows/node.js.yml/badge.svg)](https://github.com/Hexagon/base64/actions/workflows/node.js.yml) 
[![npm version](https://badge.fury.io/js/@hexagon%2Fbase64.svg)](https://badge.fury.io/js/@hexagon%2Fbase64) [![NPM Downloads](https://img.shields.io/npm/dm/@hexagon/base64.svg)](https://www.npmjs.org/package/@hexagon/base64) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/4978bdbf495941c087ecb32b120f28ff)](https://www.codacy.com/gh/Hexagon/base64/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Hexagon/base64&amp;utm_campaign=Badge_Grade)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Hexagon/base64/blob/master/LICENSE) [![jsdelivr](https://data.jsdelivr.com/v1/package/gh/hexagon/base64/badge?style=rounded)](https://www.jsdelivr.com/package/gh/hexagon/base64)

*   Support regular base64, and base64url
*   Convert to/from string or ArrayBuffers
*   Works in Node.js >=4.0 (both require and import).
*   Works in Deno >=1.16.
*   Works in browsers as standalone, UMD or ES-module.
*   Includes [TypeScript](https://www.typescriptlang.org/) typings.

## Installation

### Node.js

```npm install @hexagon/base64 --save```

JavaScript

```javascript
// ESM Import ...
import base64 from "@hexagon/base64";

// ... or CommonJS Require
const base64 = require("@hexagon/base64");
```

TypeScript

*Note that only default export is available in Node.js TypeScript, as the commonjs module is used internally.*

```typescript
import base64 from "@hexagon/base64";

// ...
```

### Deno

JavaScript

```javascript
import base64 from "https://cdn.jsdelivr.net/gh/hexagon/base64@1/src/base64.js";

// ...
```

TypeScript

```typescript
import { base64 } from "https://cdn.jsdelivr.net/gh/hexagon/base64@1/src/base64.js";

// ...
```

### Browser 

#### Manual

*   Download latest [zipball](https://github.com/Hexagon/base64/archive/refs/heads/master.zip)
*   Unpack
*   Grab ```base64.min.js``` (UMD and standalone) or ```base64.min.mjs``` (ES-module) from the [dist/](/dist) folder

#### CDN

To use as a [UMD](https://github.com/umdjs/umd)-module (stand alone, [RequireJS](https://requirejs.org/) etc.)

```html
<script src="https://cdn.jsdelivr.net/npm/@hexagon/base64@1/dist/base64.min.js"></script>
```

To use as a [ES-module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

```html
<script type="module">
	import base64 from "https://cdn.jsdelivr.net/npm/@hexagon/base64@/dist/base64.min.mjs";

	// ... see usage section ...
</script>
```
## Documentation

Full documentation available at [hexagon.github.io/base64](https://hexagon.github.io/base64/base64.html).

## API

The library encodes and decodes base64/base64url to and from ArrayBuffers

 - __fromArrayBuffer(buffer)__ - Encodes `ArrayBuffer` into base64 string
 - __toArrayBuffer(str)__ - Decodes base64 string to `ArrayBuffer`

 - __fromArrayBuffer(buffer, true)__ - Encodes `ArrayBuffer` into base64url string
 - __toArrayBuffer(str, true)__ - Decodes base64url string to `ArrayBuffer`

 - __fromString(str)__ - Encodes `String` into base64 string
 - __toString(str)__ - Decodes base64 string to `String`

 - __fromString(buffer, true)__ - Encodes `String` into base64url string
 - __toString(str, true)__ - Decodes base64url string to `String`

## Contributing

See [Contribution Guide](/CONTRIBUTING.md)

## License

MIT
