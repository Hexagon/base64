export default [
	{
		input: "./src/base64.single.js",
		output: {
			file: "dist/base64.cjs",
			format: "umd",
			name: "base64",
			exports: "default"
		}
	},
	{	
		input: "./src/base64.js",
		output: {
			file: "dist/base64.mjs",
			format: "es"
		}
	}
];