import React from 'react';
import PropTypes from 'prop-types';

const style = {
	tile: {
		width: '100px',
		height: '100px',
		borderStyle: 'dotted',
		display: 'inline-block',
		textAlign: 'center'
	},
	tileSpan: {
		position: 'absolute',
		fontSize: 32
	}
};

function Tile({power}) {
	return (<div style={style.tile}>
		<span style={style.tileSpan}>{ power > 0 ? 2 ** power : "" }</span>
	</div>)
}
Tile.propTypes = {
	power: PropTypes.number.isRequired
};

export default Tile