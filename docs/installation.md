---
layout: page
title: "Installation"
nav_order: 2
---

# Installing Base64

---

{% include display.html %}

### Node.js

```bash
npm install @hexagon/base64 --save
```

JavaScript:

```javascript
	// ESM Import
	import base64 from "@hexagon/base64";

	// ... or CommonJS Require
	const base64 = require("@hexagon/base64");
```

TypeScript:

*Note: In Node.js TypeScript, only the default export is available as the commonjs module is used internally.*

```javascript
import base64 from "@hexagon/base64";
// ...
```

### Deno

JavaScript:

```javascript
// Deno.land/x
import base64 from "https://deno.land/x/b64@1.1.28/src/base64.js";

// ... or jsr.io
import base64 from "jsr:@hexagon/base64@1.1.28";
```

TypeScript:

```
// Deno.land/x
import { base64 } from "https://deno.land/x/b64@1.1.28/src/base64.js";

// ... or jsr.io
import { base64 } from "jsr:@hexagon/base64@1.1.28";
```

### Browser

#### Manual

- Download the latest [zipball](https://github.com/Hexagon/base64/archive/refs/heads/master.zip).
- Unpack.
- Grab `base64.min.js` (UMD and standalone) or `base64.min.mjs` (ES-module) from the [dist/](/dist) folder.

#### CDN

For a [UMD](https://github.com/umdjs/umd)-module (standalone, [RequireJS](https://requirejs.org/), etc.):

```html
<script src="https://cdn.jsdelivr.net/npm/@hexagon/base64@1/dist/base64.min.js"></script>
```

As an [ES-module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules):

```html
<script type="module">
    import base64 from "https://cdn.jsdelivr.net/npm/@hexagon/base64@1/dist/base64.min.mjs";
    // ... see 'Usage' section ...
</script>
```