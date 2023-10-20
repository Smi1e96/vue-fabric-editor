import { defineConfig } from 'father';
import { name } from './package.json';
export default defineConfig({
  // cjs: {
  //   output: 'dist/cjs',
  // },
  // esm: {
  //   output: 'dist/esm',
  // },
  // umd: {
  //   output: {
  //     path: 'dist/umd',
  //     filename: 'index.js',
  //   },
  //   name,
  //   externals: {
  //     'fabric': 'fabric'
  //   }
  // },
  esm: {},
  cjs: {},
  umd: {},
  platform: 'browser'
})