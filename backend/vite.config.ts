import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    env: loadEnv('test', '', ''),
    fileParallelism: false,
  },
  plugins: [tsconfigPaths()],
});
