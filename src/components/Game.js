import React from 'react';
import { connect } from 'react-redux'
import Tile from './Tile';
import * as actions from '../actions';

function mapStateToProps(state) {
	return state;
}

class Game extends React.Component {

	componentDidMount() {
		this.startGame();
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.shouldDrop) {
			const rdn = this.getRandom();
			this.props.dispatch(actions.newTile(rdn[0], rdn[1]));
		}
	}

	startGame() {
		const rdn = this.getRandom();
		this.props.dispatch(actions.newGame(rdn[0], rdn[1]));
	}

	onKeyPressed(evt) {
		switch(evt.keyCode) {
			case 37: 
				this.props.dispatch(actions.moveLeft());
				break;
			case 38: 
				this.props.dispatch(actions.moveUp());
				break;
			case 39: 
				this.props.dispatch(actions.moveRight());
				break;
			case 40: 
				this.props.dispatch(actions.moveDown());
				break;
			default: return;
		}
	}


	getRandom() {
		var idx = Math.floor(Math.random() * 16);
		while (this.props.tiles[idx] !== 0) {
			idx = Math.floor(Math.random() * 16);
		}
		return [idx, Math.floor(Math.random() * 4) % 4 == 0];
	}

	render() {
		return (<div onKeyDown={this.onKeyPressed.bind(this)} tabIndex="0">
			<div>{ this.props.tiles.slice(0,4).map((p, idx) => <Tile key={idx} power={p} />) }</div>
			<div>{ this.props.tiles.slice(4,8).map((p, idx) => <Tile key={idx} power={p} />) }</div>
			<div>{ this.props.tiles.slice(8,12).map((p, idx) => <Tile key={idx} power={p} />) }</div>
			<div>{ this.props.tiles.slice(12).map((p, idx) => <Tile key={idx} power={p} />) }</div>
		</div>)
	}
}

Game.defaultProps = { tiles: Array(16).fill(0), shouldDrop: false };

export default connect(mapStateToProps)(Game)