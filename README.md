<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/hexagon/base64@main/base64.png" alt="@hexagon/base64" width="200" height="200"><br>
  <br>Probably the only JavaScript base64 library you'll ever need!<br>
</p>

# @hexagon/base64

Encode, decode and validate base64/base64url to string/arraybuffer and vice-versa. Works in Node, Deno and browser.

[![Node.js CI](https://github.com/Hexagon/base64/actions/workflows/node.js.yml/badge.svg)](https://github.com/Hexagon/base64/actions/workflows/node.js.yml) [![Deno CI](https://github.com/Hexagon/base64/actions/workflows/deno.yml/badge.svg)](https://github.com/Hexagon/base64/actions/workflows/deno.yml) 
[![npm version](https://badge.fury.io/js/@hexagon%2Fbase64.svg)](https://badge.fury.io/js/@hexagon%2Fbase64) [![NPM Downloads](https://img.shields.io/npm/dm/@hexagon/base64.svg)](https://www.npmjs.org/package/@hexagon/base64) [![jsdelivr](https://data.jsdelivr.com/v1/package/npm/@hexagon/base64/badge?style=rounded)](https://www.jsdelivr.com/package/npm/@hexagon/base64) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/4978bdbf495941c087ecb32b120f28ff)](https://www.codacy.com/gh/Hexagon/base64/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Hexagon/base64&amp;utm_campaign=Badge_Grade)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Hexagon/base64/blob/master/LICENSE) 

*   Supports regular base64 and base64url
*   Convert to/from string or arraybuffer
*   Validate / identify base64 and base64url
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
import base64 from "https://deno.land/x/b64@1.1.24/src/base64.js";

// ...
```

TypeScript

```typescript
import { base64 } from "https://deno.land/x/b64@1.1.24/src/base64.js";

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

To use as an [ES-module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)

```html
<script type="module">
	import base64 from "https://cdn.jsdelivr.net/npm/@hexagon/base64@1/dist/base64.min.mjs";

	// ... see usage section ...
</script>
```
## Documentation

Full documentation available at [hexagon.github.io/base64](https://hexagon.github.io/base64/).

### Examples

Assuming you have imported base64 as described under 'Installation'.

```javascript
// Encode string as regular base64
const example1enc = base64.fromString("Hellö Wörld, how are you doing today?!");
console.log(example1enc);
// > SGVsbMO2IFfDtnJsZCwgaG93IGFyZSB5b3UgZG9pbmcgdG9kYXk/IQ==

// Decode string as regular base64
const example1dec = base64.toString("SGVsbMO2IFfDtnJsZCwgaG93IGFyZSB5b3UgZG9pbmcgdG9kYXk/IQ==");
console.log(example1dec);
// > Hellö Wörld, how are you doing today?!

// Encode string as base64url (setting the second parameter to true gives base64url)
const example2enc = base64.fromString("Hellö Wörld, how are you doing today?!", true);
console.log(example2enc);
// > SGVsbMO2IFfDtnJsZCwgaG93IGFyZSB5b3UgZG9pbmcgdG9kYXk_IQ

// Decode string as base64url (setting the second parameter to true takes base64url)
const example2dec = base64.toString("SGVsbMO2IFfDtnJsZCwgaG93IGFyZSB5b3UgZG9pbmcgdG9kYXk_IQ", true);
console.log(example2dec);
// > Hellö Wörld, how are you doing today?!

// Check if string is base64url (setting the second parameter to true validates base64url)
const example3valid = base64.validate("SGVsbMO2IFfDtnJsZCwgaG93IGFyZSB5b3UgZG9pbmcgdG9kYXk_IQ", true);
console.log(example3valid);
// > true

// Check if string is base64
const example4valid = base64.validate("SGVsbMO2IFfDtnJsZCwgaG93IGFyZSB5b3UgZG9pbmcgdG9kYXk_IQ");
console.log(example4valid);
// > false

// Check if string is base64
const example5valid = base64.validate("SGVsbMO2IFfDtnJsZCwgaG93IGFyZSB5b3UgZG9pbmcgdG9kYXk/IQ==");
console.log(example5valid);
// > true

```

### Full API

The library encodes and decodes base64/base64url to ArrayBuffers and vice-versa

 - __fromArrayBuffer(buffer, urlMode)__ - Encodes `ArrayBuffer` into base64 or base64url if urlMode(optional) is true
 - __toArrayBuffer(str, urlMode)__ - Decodes base64url string (or base64url string if urlMode is true) to `ArrayBuffer`

 - __fromString(str, urlMode)__ - Encodes `String` into base64 string(base64url string if urlMode is true)
 - __toString(str, urlMode)__ - Decodes base64 or base64url string to `String`

- __validate(str, urlMode)__ - Returns true if `String` str is valid base64/base64 dependending on urlMode

## Contributing

See [Contribution Guide](/CONTRIBUTING.md)

### Contributors

The underlying code is loosely based on [github.com/niklasvh/base64-arraybuffer](https://github.com/niklasvh/base64-arraybuffer)

## License

MIT
