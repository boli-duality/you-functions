// import { terser } from 'rollup-plugin-terser'

module.exports = {
  input: 'src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'es',
    // plugins: [terser()],
  },
}
