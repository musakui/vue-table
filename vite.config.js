import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	plugins: [
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
