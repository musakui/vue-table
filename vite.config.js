import { defineConfig } from 'vite'

import uno from 'unocss/vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	plugins: [
		//
		uno(),
		vue(),
	],
	build: {
		lib: {
			formats: ['es'],
			entry: './lib/index.js',
			fileName: 'index',
		},
		rollupOptions: {
			external: ['vue'],
		},
	},
})
