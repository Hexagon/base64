import { assertEquals } from "https://deno.land/std@0.128.0/testing/asserts.ts";
import { base64 } from "../../../src/base64.js";

Deno.test("Encode 'Hello Wörld'", function () {
  let result = base64.fromString("Hello world");
  assertEquals(result, "SGVsbG8gd29ybGQ=");
});

Deno.test("Decode 'Hello World'", function () {
  let result = base64.toString("SGVsbG8gd29ybGQ=");
  assertEquals(result, "Hello world");
});

// Basic string base64url
Deno.test("Encode 'Hello Wörld' in base64url mode", function () {
  let result = base64.fromString("Hello world", true);
  assertEquals(result, "SGVsbG8gd29ybGQ");
});

Deno.test("Decode 'Hello World' in base64url mode", function () {
  let result = base64.toString("SGVsbG8gd29ybGQ", true);
  assertEquals(result, "Hello world");
});

// UTF-8 string
Deno.test("Encode 'Hello Wörld' in base64url mode", function () {
  let result = base64.fromString("ɸåäd");
  assertEquals(result, "ybjDpcOkZA==");
});

Deno.test("Decode 'Hello World' in base64url mode", function () {
  let result = base64.toString("ybjDpcOkZA==");
  assertEquals(result, "ɸåäd");
});

// UTF-8 string url mode
Deno.test("Encode 'Hello Wörld' in base64url mode", function () {
  let result = base64.fromString("ɸåäd", true);
  assertEquals(result, "ybjDpcOkZA");
});

Deno.test("Decode 'Hello World' in base64url mode", function () {
  let result = base64.toString("ybjDpcOkZA", true);
  assertEquals(result, "ɸåäd");
});

// ArrayBuffer base64
Deno.test("Encode array buffer", function () {
  let result = base64.fromArrayBuffer(
    Uint8Array.from([0x0, 0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8]).buffer,
  );
  assertEquals(result, "AAECAwQFBgcI");
});

Deno.test("Decode array buffer", function () {
  let result = base64.toArrayBuffer("AAECAwQFBgcI");
  assertEquals(
    result,
    Uint8Array.from([0x0, 0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8]).buffer,
  );
});
