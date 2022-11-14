import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.es.js',
      format: 'es',
      plugins: [terser()],
    },
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: '$y',
      plugins: [terser()],
    },
  ],
}
