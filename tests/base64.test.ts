import { assertEquals } from "@std/assert";
import { test } from "@cross/test";

import { base64, fromString, toString, fromArrayBuffer, toArrayBuffer, validate } from "../src/base64.ts";

test("Encode 'Hello world'", function () {
  const result = base64.fromString("Hello world");
  assertEquals(result, "SGVsbG8gd29ybGQ=");
});

test("Encode 'Hello world' without going through namespace", function () {
  const result = fromString("Hello world");
  assertEquals(result, "SGVsbG8gd29ybGQ=");
});

test("Decode 'Hello world'", function () {
  const result = base64.toString("SGVsbG8gd29ybGQ=");
  assertEquals(result, "Hello world");
});

test("Decode 'Hello world' without going through namespace", function () {
  const result = toString("SGVsbG8gd29ybGQ=");
  assertEquals(result, "Hello world");
});

// Basic string base64url
test("Encode 'Hello world' in base64url mode", function () {
  const result = base64.fromString("Hello world", true);
  assertEquals(result, "SGVsbG8gd29ybGQ");
});

test("Decode 'Hello world' in base64url mode", function () {
  const result = base64.toString("SGVsbG8gd29ybGQ", true);
  assertEquals(result, "Hello world");
});

// UTF-8 string
test("Encode 'ɸåäd' in base64url mode", function () {
  const result = base64.fromString("ɸåäd");
  assertEquals(result, "ybjDpcOkZA==");
});

test("Decode 'ɸåäd' in base64url mode", function () {
  const result = base64.toString("ybjDpcOkZA==");
  assertEquals(result, "ɸåäd");
});

// UTF-8 string url mode
test("Encode 'ɸåäd' in base64url mode", function () {
  const result = base64.fromString("ɸåäd", true);
  assertEquals(result, "ybjDpcOkZA");
});

test("Decode 'ɸåäd' in base64url mode", function () {
  const result = base64.toString("ybjDpcOkZA", true);
  assertEquals(result, "ɸåäd");
});

// ArrayBuffer base64
test("Encode array buffer", function () {
  const result = base64.fromArrayBuffer(
    Uint8Array.from([0x0, 0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8]).buffer,
  );
  assertEquals(result, "AAECAwQFBgcI");
});

test("Encode array buffer without going through namespace", function () {
  const result = fromArrayBuffer(
    Uint8Array.from([0x0, 0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8]).buffer,
  );
  assertEquals(result, "AAECAwQFBgcI");
});

test("Decode array buffer", function () {
  const result = base64.toArrayBuffer("AAECAwQFBgcI");
  assertEquals(
    result,
    Uint8Array.from([0x0, 0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8]).buffer,
  );
});

test("Decode array buffer without going through namespace", function () {
  const result = toArrayBuffer("AAECAwQFBgcI");
  assertEquals(
    result,
    Uint8Array.from([0x0, 0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8]).buffer,
  );
});


// Validate
test("AAECAwQFBgcI is valid base64 and base64url", function () {
  const resultNormal = base64.validate("AAECAwQFBgcI"),
    resultUrl = base64.validate("AAECAwQFBgcI", true);

  assertEquals(resultNormal, true);
  assertEquals(resultUrl, true);
});

test("AAECAwQFBgcI is valid base64 and base64url withouth going through namespace", function () {
  const resultNormal = validate("AAECAwQFBgcI"),
    resultUrl = base64.validate("AAECAwQFBgcI", true);

  assertEquals(resultNormal, true);
  assertEquals(resultUrl, true);
});

test("SGVsbG8gd29ybGQ= is valid base64 but not base64url", function () {
  const resultNormal = base64.validate("SGVsbG8gd29ybGQ="),
    resultUrl = base64.validate("SGVsbG8gd29ybGQ=", true);

  assertEquals(resultNormal, true);
  assertEquals(resultUrl, false);
});

test("PDw/Pz8+Pg== is valid base64 but not base64url", function () {
  const resultNormal = base64.validate("PDw/Pz8+Pg=="),
    resultUrl = base64.validate("PDw/Pz8+Pg==", true);
  assertEquals(resultNormal, true);
  assertEquals(resultUrl, false);
});

test("c3ViamVjdHM_X2Q9MQ is valid base64 but not base64url", function () {
  const resultNormal = base64.validate("c3ViamVjdHM_X2Q9MQ"),
    resultUrl = base64.validate("c3ViamVjdHM_X2Q9MQ", true);

  assertEquals(resultNormal, false);
  assertEquals(resultUrl, true);
});

test("c3ViamVjdHM_+X2Q9MQ is neither base64 nor base64url", function () {
  const resultNormal = base64.validate("c3ViamVjdHM_+X2Q9MQ"),
    resultUrl = base64.validate("c3ViamVjdHM_+X2Q9MQ", true);

  assertEquals(resultNormal, false);
  assertEquals(resultUrl, false);
});

test("Standard tests for base64", function () {
  assertEquals(base64.fromString(""),"");
  assertEquals(base64.fromString("f"),"Zg==");
  assertEquals(base64.fromString("fo"),"Zm8=");
  assertEquals(base64.fromString("foo"),"Zm9v");
  assertEquals(base64.fromString("foob"),"Zm9vYg==");
  assertEquals(base64.fromString("fooba"),"Zm9vYmE=");
  assertEquals(base64.fromString("foobar"),"Zm9vYmFy");
});