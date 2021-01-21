/* global require */
import typescript from 'rollup-plugin-typescript2'

export default {
  input: "src/index.ts",
  output: {
      dir: "./dist"
    }
  ,
  plugins: [typescript({ typescript: require("typescript") })]
}