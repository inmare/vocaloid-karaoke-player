import {defineConfig} from 'vite';

// 피아프로 서버에서 데이터를 가져오기 위한 프록시 설정
export default defineConfig({
	server: {
		cors: true,
		proxy: {
			'/api': {
				target: 'http://localhost:8000',
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api/, ''),
			},
			'/piapro': {
				target: 'https://piapro.jp',
				changeOrigin: true,
				rewrite: path => path.replace(/^\/piapro/, '/t'),
			},
			'/cdnPiapro': {
				target: 'https://cdn.piapro.jp',
				changeOrigin: true,
				rewrite: path => path.replace(/^\/cdnPiapro/, ''),
			},
		},
	},
});
