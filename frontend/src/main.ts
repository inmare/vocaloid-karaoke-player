// Const urlPrefix = '/cdnPiapro';
// const urlConvert = (url: string) => url.replace('https://cdn.piapro.jp', urlPrefix);
// const fakeData = {
// 	url: 'https://piapro.jp/t/jEPl',
// 	mp3Url: urlConvert('https://cdn.piapro.jp/mp3_a/ko/ko4of47p1u5lalx4_20141111195715_audition.mp3'),
// 	title: '夜明けと蛍',
// 	titleKR: '새벽과 반딧불',
// };

// async function getPiaproMp3Url(url: string) {
// 	const response = await fetch(urlConvert(url));
// 	const text = await response.text();

// 	const re = /https:\/\/cdn\.piapro\.jp\/.+\.mp3/;
// 	const match = re.exec(text);
// 	if (!match) {
// 		throw new Error('Failed to find mp3 url');
// 	}

// 	const mp3Url = match[0];
// 	return mp3Url;
// }

// function updateViewportHeight() {
// 	const viewPortHeight = window.innerHeight;
// 	document.documentElement.style.setProperty('--vh', `${viewPortHeight * 0.01}px`);
// }

// updateViewportHeight();
// window.addEventListener('resize', updateViewportHeight);

// async function playAudio() {
// 	const audioContext: AudioContext = new window.AudioContext();
// 	const audioResponse = await fetch(fakeData.mp3Url);
// 	const buffer = await audioResponse.arrayBuffer();
// 	const audioBuffer = await audioContext.decodeAudioData(buffer);
// 	const source = audioContext.createBufferSource();
// 	source.buffer = audioBuffer;
// 	source.connect(audioContext.destination);
// 	source.start();
// }

// const playButton: HTMLButtonElement = document.querySelector('#play')!;
// playButton.addEventListener('click', playAudio);

// const button: HTMLButtonElement = document.querySelector('#get')!;

// type ApiResponse = {
// 	Hello: string;
// };

// button.addEventListener('click', async () => {
// 	const response = await fetch('/api/');
// 	response.json().then((data: ApiResponse) => {
// 		console.table(data);
// 	}).catch((error: unknown) => {
// 		console.error('Error:', error);
// 	});
// });

const form: HTMLFormElement = document.querySelector('#form')!;
form.addEventListener('submit', async (event: Event) => {
	event.preventDefault();

	const formData = new FormData(this);

	const response = await fetch('/api/search', {
		method: 'POST',
		body: formData,
	});
});
