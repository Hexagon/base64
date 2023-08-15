---
layout: page
title: "Examples"
nav_order: 3
---

# Hexagon/Base64 Examples
<br>

Assuming you have imported base64 as described under 'Installation'.

{% include multiplex.html %}

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