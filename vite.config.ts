import { fileURLToPath, URL } from 'node:url';
import { getFileBasedRouteName } from 'unplugin-vue-router';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import VueDevTools from 'vite-plugin-vue-devtools';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import VueRouter from 'unplugin-vue-router/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VueDevTools(),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core', '@vueuse/head', 'pinia'],
      dts: 'src/types/auto-imports.d.ts',
    }),
    Components({
      dts: 'src/types/components.d.ts',
      dirs: ['src/components'],
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    }),
    VueRouter({
      // how and what folders to scan for files
      routesFolder: [
        {
          src: 'src/pages',
          path: '',
          // override globals
          exclude: (excluded) => excluded,
          filePatterns: (filePatterns) => filePatterns,
          extensions: (extensions) => extensions,
        },
      ],

      // what files should be considered as a pages
      extensions: ['.vue'],

      // what files to include
      filePatterns: ['**/*'],

      // files to exclude from the scan
      exclude: [],

      // where to generate the types
      dts: 'src/types/router.d.ts',

      // how to generate the route name
      getRouteName: (routeNode) => getFileBasedRouteName(routeNode),

      // default language for <route> custom blocks
      routeBlockLang: 'json5',

      // how to import routes. can also be a string
      importMode: 'async',

      // where are paths relative to
      root: process.cwd(),

      // options for the path parser
      pathParser: {
        // should `users.[id]` be parsed as `users/:id`?
        dotNesting: true,
      },

      // modify routes individually
      // async extendRoute(route) {
      //   // ...
      // },

      // modify routes before writing
      // async beforeWriteFiles(rootRoute) {
      //   // ...
      // },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
