import bubble from 'rollup-plugin-buble';

export default {
  input: 'src/index.js',
  plugins: [
    bubble()
  ],
  output: {
    file: 'dist/cco.js',
    name: 'cco',
    format: 'umd'
  }
};
