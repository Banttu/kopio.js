import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default [
  {
    input: 'src/kopio.js',
    output: {
      file: pkg.browser,
      format: 'umd',
    },
    name: 'Kopio.js',
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: ['node_modules/**'],
      }),
    ],
  },
  {
    input: 'src/kopio.js',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: [
      babel({
        exclude: ['node_modules/**'],
      }),
    ],
  },
];
