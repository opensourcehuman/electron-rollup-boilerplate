import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import { uglify } from "rollup-plugin-uglify";

//  E X P O R T

export default [
  {
    input: "src/index.js",
    output: [
      {
        file: "build/bundle.js",
        format: "cjs"
      }
    ],
    plugins: [
      babel({
        exclude: ["node_modules/**", "src/sass/**"]
      }),
      process.env.NODE_ENV !== "development" && uglify() // only minify in production
    ]
  },

  {
    // electron | main
    external: ["electron", "electron-reloader", "path", "url"],
    input: "src/main.js",
    output: [
      {
        file: "build/main.js",
        format: "cjs"
      }
    ],
    plugins: [
      babel({
        exclude: "node_modules/**"
      }),
      process.env.NODE_ENV !== "development" && uglify() // only minify in production
    ]
  }
];
