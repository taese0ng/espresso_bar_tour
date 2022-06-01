import svelte from "rollup-plugin-svelte";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";
import css from "rollup-plugin-css-only";
import scss from "rollup-plugin-scss";
import postcss from "postcss";
import autoprefixer from "autoprefixer";
import alias from "@rollup/plugin-alias";
import path from "path";

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require("child_process").spawn(
				"npm",
				["run", "start", "--", "--dev"],
				{
					stdio: ["ignore", "inherit", "inherit"],
					shell: true,
				},
			);

			process.on("SIGTERM", toExit);
			process.on("exit", toExit);
		},
	};
}

export default {
	input: "src/main.ts",
	output: {
		// sourcemap: true,
		sourcemap: !production,
		format: "iife",
		name: "app",
		file: "public/build/bundle.js",
	},
	plugins: [
		svelte(require("./svelte.config")),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: "bundle.css" }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ["svelte"],
		}),
		commonjs(),
		typescript({
			sourceMap: !production,
			inlineSources: !production,
		}),
		scss({
			output: "public/build/scss.css",
			processor: (css) =>
				postcss([autoprefixer])
					.process(css)
					.then((result) => result.css),
		}),
		alias({
			entries: [
				{ find: "~", replacement: path.resolve(__dirname, "src") },
				{ find: "@pages", replacement: path.resolve(__dirname, "src/pages") },
				{
					find: "@components",
					replacement: path.resolve(__dirname, "src/components"),
				},
				{ find: "@apis", replacement: path.resolve(__dirname, "src/apis") },
				{ find: "@assets", replacement: path.resolve(__dirname, "src/assets") },
				{
					find: "@interfaces",
					replacement: path.resolve(__dirname, "src/interfaces"),
				},
				{ find: "@routes", replacement: path.resolve(__dirname, "src/routes") },
				{ find: "@utils", replacement: path.resolve(__dirname, "src/utils") },
				{
					find: "@constants",
					replacement: path.resolve(__dirname, "src/constants"),
				},
			],
		}),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload("public"),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser(),
	],
	watch: {
		clearScreen: false,
	},
};
