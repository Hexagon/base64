let 
	test = require("uvu").test,
	assert = require("uvu/assert");

// Actual tests
module.exports = function (base64) {
	// String base64
	test("Encode 'Hello world'", function () {
		let result = base64.fromString("Hello world");
		assert.equal(result, "SGVsbG8gd29ybGQ=");
	});

	test("Decode 'Hello world'", function () {
		let result = base64.toString("SGVsbG8gd29ybGQ=");
		assert.equal(result, "Hello world");
	});

	// Basic string base64url
	test("Encode 'Hello world' in base64url mode", function () {
		let result = base64.fromString("Hello world", true);
		assert.equal(result, "SGVsbG8gd29ybGQ");
	});

	test("Decode 'Hello world' in base64url mode", function () {
		let result = base64.toString("SGVsbG8gd29ybGQ", true);
		assert.equal(result, "Hello world");
	});

	// UTF-8 string
	test("Encode 'ɸåäd' in base64url mode", function () {
		let result = base64.fromString("ɸåäd");
		assert.equal(result, "ybjDpcOkZA==");
	});

	test("Decode 'ɸåäd' in base64url mode", function () {
		let result = base64.toString("ybjDpcOkZA==");
		assert.equal(result, "ɸåäd");
	});

	// UTF-8 string url mode
	test("Encode 'ɸåäd' in base64url mode", function () {
		let result = base64.fromString("ɸåäd", true);
		assert.equal(result, "ybjDpcOkZA");
	});

	test("Decode 'ɸåäd' in base64url mode", function () {
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

	// Validate
	test("AAECAwQFBgcI is valid base64 and base64url", function () {
		let resultNormal = base64.validate("AAECAwQFBgcI"),
			resultUrl = base64.validate("AAECAwQFBgcI", true);

		assert.equal(resultNormal, true);
		assert.equal(resultUrl, true);
	});

	test("SGVsbG8gd29ybGQ= is valid base64 but not base64url", function () {
		let resultNormal = base64.validate("SGVsbG8gd29ybGQ="),
			resultUrl = base64.validate("SGVsbG8gd29ybGQ=", true);

		assert.equal(resultNormal, true);
		assert.equal(resultUrl, false);
	});

	test("PDw/Pz8+Pg== is valid base64 but not base64url", function () {
		let resultNormal = base64.validate("PDw/Pz8+Pg=="),
			resultUrl = base64.validate("PDw/Pz8+Pg==", true);
		assert.equal(resultNormal, true);
		assert.equal(resultUrl, false);
	});
	
	test("c3ViamVjdHM_X2Q9MQ is valid base64 but not base64url", function () {
		let resultNormal = base64.validate("c3ViamVjdHM_X2Q9MQ"),
			resultUrl = base64.validate("c3ViamVjdHM_X2Q9MQ", true);

		assert.equal(resultNormal, false);
		assert.equal(resultUrl, true);
	});

	test("c3ViamVjdHM_+X2Q9MQ is neither base64 nor base64url", function () {
		let resultNormal = base64.validate("c3ViamVjdHM_+X2Q9MQ"),
			resultUrl = base64.validate("c3ViamVjdHM_+X2Q9MQ", true);

		assert.equal(resultNormal, false);
		assert.equal(resultUrl, false);
	});

	test("Typed array is neither base64 nor base64url", function () {
		let ab = new Uint8Array([0,1,2]),
			resultNormal = base64.validate(ab),
			resultUrl = base64.validate(ab, true);

		assert.equal(resultNormal, false);
		assert.equal(resultUrl, false);
	});

	test("Number is neither base64 nor base64url", function () {
		let ab = 7,
			resultNormal = base64.validate(ab),
			resultUrl = base64.validate(ab, true);

		assert.equal(resultNormal, false);
		assert.equal(resultUrl, false);
	});

	test("Date is neither base64 nor base64url", function () {
		let ab = new Date(),
			resultNormal = base64.validate(ab),
			resultUrl = base64.validate(ab, true);

		assert.equal(resultNormal, false);
		assert.equal(resultUrl, false);
	});

	test.run();

};