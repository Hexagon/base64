import { assertEquals } from "jsr:@std/assert@1.0.2";
import { base64 } from "../src/base64.ts";

Deno.test("Encode 'Hello world'", function () {
  const result = base64.fromString("Hello world");
  assertEquals(result, "SGVsbG8gd29ybGQ=");
});

Deno.test("Decode 'Hello world'", function () {
  const result = base64.toString("SGVsbG8gd29ybGQ=");
  assertEquals(result, "Hello world");
});

// Basic string base64url
Deno.test("Encode 'Hello world' in base64url mode", function () {
  const result = base64.fromString("Hello world", true);
  assertEquals(result, "SGVsbG8gd29ybGQ");
});

Deno.test("Decode 'Hello world' in base64url mode", function () {
  const result = base64.toString("SGVsbG8gd29ybGQ", true);
  assertEquals(result, "Hello world");
});

// UTF-8 string
Deno.test("Encode 'ɸåäd' in base64url mode", function () {
  const result = base64.fromString("ɸåäd");
  assertEquals(result, "ybjDpcOkZA==");
});

Deno.test("Decode 'ɸåäd' in base64url mode", function () {
  const result = base64.toString("ybjDpcOkZA==");
  assertEquals(result, "ɸåäd");
});

// UTF-8 string url mode
Deno.test("Encode 'ɸåäd' in base64url mode", function () {
  const result = base64.fromString("ɸåäd", true);
  assertEquals(result, "ybjDpcOkZA");
});

Deno.test("Decode 'ɸåäd' in base64url mode", function () {
  const result = base64.toString("ybjDpcOkZA", true);
  assertEquals(result, "ɸåäd");
});

// ArrayBuffer base64
Deno.test("Encode array buffer", function () {
  const result = base64.fromArrayBuffer(
    Uint8Array.from([0x0, 0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8]).buffer,
  );
  assertEquals(result, "AAECAwQFBgcI");
});

Deno.test("Decode array buffer", function () {
  const result = base64.toArrayBuffer("AAECAwQFBgcI");
  assertEquals(
    result,
    Uint8Array.from([0x0, 0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8]).buffer,
  );
});

// Validate
Deno.test("AAECAwQFBgcI is valid base64 and base64url", function () {
  const resultNormal = base64.validate("AAECAwQFBgcI"),
    resultUrl = base64.validate("AAECAwQFBgcI", true);

  assertEquals(resultNormal, true);
  assertEquals(resultUrl, true);
});

Deno.test("SGVsbG8gd29ybGQ= is valid base64 but not base64url", function () {
  const resultNormal = base64.validate("SGVsbG8gd29ybGQ="),
    resultUrl = base64.validate("SGVsbG8gd29ybGQ=", true);

  assertEquals(resultNormal, true);
  assertEquals(resultUrl, false);
});

Deno.test("PDw/Pz8+Pg== is valid base64 but not base64url", function () {
  const resultNormal = base64.validate("PDw/Pz8+Pg=="),
    resultUrl = base64.validate("PDw/Pz8+Pg==", true);
  assertEquals(resultNormal, true);
  assertEquals(resultUrl, false);
});

Deno.test("c3ViamVjdHM_X2Q9MQ is valid base64 but not base64url", function () {
  const resultNormal = base64.validate("c3ViamVjdHM_X2Q9MQ"),
    resultUrl = base64.validate("c3ViamVjdHM_X2Q9MQ", true);

  assertEquals(resultNormal, false);
  assertEquals(resultUrl, true);
});

Deno.test("c3ViamVjdHM_+X2Q9MQ is neither base64 nor base64url", function () {
  const resultNormal = base64.validate("c3ViamVjdHM_+X2Q9MQ"),
    resultUrl = base64.validate("c3ViamVjdHM_+X2Q9MQ", true);

  assertEquals(resultNormal, false);
  assertEquals(resultUrl, false);
});
