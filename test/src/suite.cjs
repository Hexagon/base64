let 
	test = require("uvu").test,
	assert = require("uvu/assert");

// Actual tests
module.exports = function (base64) {
	// String base64
	test("Encode 'Hello Wörld'", function () {
		let result = base64.fromString("Hello world");
		assert.equal(result, "SGVsbG8gd29ybGQ=");
	});

	test("Decode 'Hello World'", function () {
		let result = base64.toString("SGVsbG8gd29ybGQ=");
		assert.equal(result, "Hello world");
	});

	// Basic string base64url
	test("Encode 'Hello Wörld' in base64url mode", function () {
		let result = base64.fromString("Hello world", true);
		assert.equal(result, "SGVsbG8gd29ybGQ");
	});

	test("Decode 'Hello World' in base64url mode", function () {
		let result = base64.toString("SGVsbG8gd29ybGQ", true);
		assert.equal(result, "Hello world");
	});

	// UTF-8 string
	test("Encode 'Hello Wörld' in base64url mode", function () {
		let result = base64.fromString("ɸåäd");
		assert.equal(result, "ybjDpcOkZA==");
	});

	test("Decode 'Hello World' in base64url mode", function () {
		let result = base64.toString("ybjDpcOkZA==");
		assert.equal(result, "ɸåäd");
	});

	// UTF-8 string url mode
	test("Encode 'Hello Wörld' in base64url mode", function () {
		let result = base64.fromString("ɸåäd", true);
		assert.equal(result, "ybjDpcOkZA");
	});

	test("Decode 'Hello World' in base64url mode", function () {
		let result = base64.toString("ybjDpcOkZA", true);
		assert.equal(result, "ɸåäd");
	});
	
	// ArrayBuffer base64
	test("Encode array buffer", function () {
		let result = base64.fromArrayBuffer(Uint8Array.from([0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7,0x8]).buffer);
		assert.equal(result, "AAECAwQFBgcI");
	});

	test("Decode array buffer", function () {
		let result = base64.toArrayBuffer("AAECAwQFBgcI");
		assert.equal(result, Uint8Array.from([0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7,0x8]).buffer);
	});

	test.run();

};