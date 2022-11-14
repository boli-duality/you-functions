import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      plugins: [terser()],
    },
    {
      file: 'dist/index.es.js',
      format: 'es',
      plugins: [terser()],
    },
    {
      file: 'dist/index.iife.js',
      format: 'iife',
      name: '$y',
      plugins: [terser()],
    },
  ],
}
