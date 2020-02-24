const INITIAL_STATE = { 
	tiles: Array(16).fill(0),
	shouldDrop: false
};

/**
 Reducers
*/
function shift(state, direction) {
	var groupedTiles = [];                                                                                                             
	for (var i = 0; i < 4; i++) {
		switch (direction) {
		case 'UP':
			groupedTiles.push(state.filter((t, idx) => idx % 4 == i));
			break;
		case 'DOWN':
			groupedTiles.push(state.filter((t, idx) => idx % 4 == i).reverse());
			break;
		case 'LEFT':
			groupedTiles.push(state.slice(i * 4, (i+1) * 4));
			break;
		case 'RIGHT':
			groupedTiles.push(state.slice(i * 4, (i+1) * 4).reverse());
			break;
		default:
			return state;
		}
	}
	groupedTiles = groupedTiles.map(tiles => mergeTiles(tiles));
	var newState = [];
	for (var i = 0; i < 16; i++) {
		var curTile;
		switch (direction) {
		case 'UP':
			curTile = groupedTiles[i%4][Math.floor(i/4)];
			break;
		case 'DOWN':
			curTile = groupedTiles[i%4][3- Math.floor(i/4)];
			break;
		case 'LEFT':
			curTile = groupedTiles[Math.floor(i/4)][i%4];
			break;
		case 'RIGHT':
			curTile = groupedTiles[Math.floor(i/4)][3-i%4];
			break;
		default:
			return state;
		}
		newState.push(curTile);
	}
	return newState;
}

function drop(state, action) {
	if (action.type !== 'NEWTILE' && action.type !== 'NEWGAME') {
		return state;
	}
	var newstate = [...state];
	if (action.use2) {
		newstate[action.idx] = 2;
	} else {
		newstate[action.idx] = 1;
	}
	return newstate;
}

function reduce(state = INITIAL_STATE, action) {
	switch (action.type) {
		case 'NEWTILE':
		return Object.assign({}, state, {
			tiles: drop(state.tiles, action),
			shouldDrop: false
		});
		case 'NEWGAME':
		return Object.assign({}, state, {
			tiles: drop(INITIAL_STATE.tiles, action),
			shouldDrop: false
		})
		case 'MOVE':
		const newtiles = shift(state.tiles, action.direction);
		var changed = newtiles.map(
			(tile, idx) => tile !== state.tiles[idx]
		).reduce((total, cur) => total || cur);
		return Object.assign({}, state, {
			tiles: newtiles,
			shouldDrop: changed
		});
		default:
		return state
	}
}

/**
 Helper functions
*/
function mergeTiles(tiles) {
	var result = Array(4).fill(0);
	if (tiles.length !== 4) {
		console.log("MergeTiles: less than 4 tiles")
		return result; // error
	}
	var realTiles = tiles.filter(tile => tile > 0);
	var idx = 0;
	while (idx < realTiles.length - 1) {
		var current = realTiles[idx];
		if (current == realTiles[idx+1]) {
			realTiles[idx] = current + 1;
			realTiles[idx+1] = null;
			idx += 2;
		} else {
			idx += 1;
		}
	}
	idx = 0;
	for (var i = 0; i < realTiles.length; i++) {
		if (realTiles[i] != null) {
			result[idx] = realTiles[i];
			idx++;
		}
	}
	return result;
}

export default reduce