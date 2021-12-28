export default [
	{
		input: "./src/sixty-four.single.js",
		output: {
			file: "dist/sixty-four.cjs",
			format: "umd",
			name: "base64",
			exports: "default"
		}
	},
	{	
		input: "./src/sixty-four.js",
		output: {
			file: "dist/sixty-four.mjs",
			format: "es"
		}
	}
];