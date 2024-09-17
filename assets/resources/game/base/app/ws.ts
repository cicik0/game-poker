import {
	director,
	game,
	instantiate,
	js,
	Label,
	native,
	Node,
	Prefab,
	resources,
	sys,
	tween,
	UIOpacity,
	Vec3,
} from 'cc';


declare global {
	var ws: any;
}
window.ws = {};
ws.websocket = null;
ws.start = () => {
	console.log('start ws');

	if (ws.websocket) {
		return;
	}

	ws.websocket = new WebSocket('ws://103.20.96.88:3000/connect');

	ws.websocket.onopen = (data) => {
		console.log('🍀 WS OPEN', data);
		game.emit('WS_ON_OPEN', data);
	};

	ws.websocket.onmessage = (data) => {
		try {
			//console.log(data.data);			
			const message = JSON.parse(data?.data);
			console.log('🍀 ', data?.data);
			game.emit('WS_ON_MESSAGE', message);
		} catch (err) {
			console.log('PARSE JSON ERROR', err);
		}
	};

	ws.websocket.onclose = (error) => {
		console.log('☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️ => WS CLOSE');

		game.emit('WS_ON_CLOSE', error);
	};

	ws.websocket.onerror = (error) => {
		console.log('☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️☠️ => WS ERROR');
		game.emit('WS_ON_ERROR', error);
	};
};

ws.send = (message) => {
	const msg = JSON.stringify(message)
	console.log('💘', msg)
	ws.websocket.send(msg);
};
