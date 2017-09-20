import bubble from 'rollup-plugin-buble';

export default {
  input: 'src/index.js',
  plugins: [
    bubble()
  ],
  output: {
    file: 'dist/c.js',
    name: 'c',
    format: 'umd'
  }
};
