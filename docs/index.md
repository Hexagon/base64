---
layout: page
title: "Usage"
nav_order: 1
---

<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/hexagon/base64@main/base64.png" alt="@hexagon/base64" width="200" height="200"><br>
  <br>Probably the only JavaScript base64 library you'll ever need!<br>
</p>

This library is your go-to solution for encoding, decoding, and validating base64 and base64url for strings and array buffers. Written as a ES-module with full typings, it operates in any environment - like Node, Deno, Bun and browsers.

- Supports regular base64 and base64url
- Convert to/from string or arraybuffer
- Validate / identify base64 and base64url
- Works in Node.js >=4.0 (both require and import).
- Works in Deno >=1.16.
- Works in browsers as standalone, UMD, or ES-module.
- Includes [TypeScript](https://www.typescriptlang.org/) typings.

# Usage

## fromArrayBuffer(buffer, urlMode)

This method encodes an `ArrayBuffer` into a base64 string. By default, it encodes to regular base64, but if the optional `urlMode` parameter is set to `true`, it will encode to base64url instead.

```javascript
	const buffer = new ArrayBuffer(8); 
	const encoded = base64.fromArrayBuffer(buffer);
```

### Parameters

- **buffer** (`ArrayBuffer`): The input ArrayBuffer that needs to be encoded.
- **urlMode** (`Boolean`, Optional): When set to true, encoding is done to base64url. Default is `false`.

## toArrayBuffer(buffer, urlMode)

This method decodes a base64 or base64url string to an `ArrayBuffer`

```javascript
	const encodedStr = "SGVsbMO2IFfDtnJsZCwgaG93IGFyZSB5b3UgZG9pbmcgdG9kYXk/IQ==";
	const buffer = base64.toArrayBuffer(encodedStr);
```

### Parameters

- **str** (`String`): The base64 or base64url encoded string that needs to be decoded.
- **urlMode** (`Boolean`, Optional): When set to true, it expects a base64url string. Default is `false`.

## fromString(str, urlMode)

This method encodes a regular string to base64 or base64url string.

```javascript
	const buffer = new ArrayBuffer(8); 
	const encoded = base64.fromArrayBuffer(buffer);
```

### Parameters

- **str** (`String`): The string to be encoded.
- **urlMode** (`Boolean`, Optional): When set to true, encoding is done to base64url. Default is `false`.

## toString(buffer, urlMode)

This method decodes a base64 or base64url string to a regular string.

```javascript
	const encodedStr = "SGVsbG8gV29ybGQ=";
	const decodedStr = base64.toString(encodedStr);
```

### Parameters

- **str** (`String`): The base64 or base64url encoded string that needs to be decoded.
- **urlMode** (`Boolean`, Optional): When set to true, it expects a base64url string. Default is `false`.

## validate(str, urlMode)

This method validates a string to check if it's a valid base64 or base64url string.

```js
	const inputStr = "SGVsbG8gV29ybGQ=";
	const isValid = base64.validate(inputStr);
```

### Parameters

- **str** (`String`): The string that needs to be validated.
- **urlMode** (`Boolean`, Optional): When set to true, it validates the string for base64url format. Default is false.

{% include multiplex.html %}

## Error Handling

Below is a detailed guide on how the library handles errors and how you can utilize these mechanisms in your application.

## Data Validation

The library has a built-in method for validating base64/base64url encoded strings:

```javascript
base64.validate = (encoded, urlMode) => {
    // Bail out if not string
    if (!(typeof encoded === "string" || encoded instanceof String)) {
        return false;
    }

    // Go on validate
    try {
        if (urlMode) {
            return /^[-A-Za-z0-9\-_]*$/.test(encoded);
        } else {
            return /^[-A-Za-z0-9+/]*={0,3}$/.test(encoded);
        }
    } catch (_e) {
        return false;
    }
};
```

Here's a breakdown:

- **Early Return for Non-strings:** If the input `encoded` is not of type string, the method immediately returns `false`.
    
- **Regex Validation:** Depending on the `urlMode`, it will validate the input string against regular Base64 or Base64url patterns. If the string does not match the pattern, it indicates the string is not a valid encoded string.
    
- **Exception Handling:** In the unlikely event of a regex test throwing an exception, the catch block ensures the function returns `false`, signaling the validation failed.

## Implicit Error Handling

The methods `toArrayBuffer`, `fromArrayBuffer`, `toString`, and `fromString` do not have explicit error handling. This design means if an issue arises (like a malformed base64 string), JavaScript's default error mechanisms will take over. Hence, when using these functions, it's essential to implement try-catch blocks in your application for comprehensive error handling.

For example:

```javascript
try {
    const decodedBuffer = base64.toArrayBuffer(someEncodedString);
} catch (error) {
    console.error("Failed to decode the string: ", error.message);
}
```

In this way, any errors during the decoding process will be caught and can be handled appropriately in the application.

{% include display.html %}

## Recommendations

- **Always Validate:** Before attempting to decode, it's a good practice to validate the encoded string using the `validate` method. This step can prevent potential issues down the line.
    
- **Wrap in Try-Catch:** Given the implicit error handling design, always wrap your calls to `base64` methods within a try-catch block for safety.
