/*
 * action types
 */
export const NEWGAME = 'NEWGAME';
export const MOVE = 'MOVE';

export const NEWTILE = 'NEWTILE';
/*
 * other constants
 */
export const Directions = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
};
/*
 * action creators
 */
export const newGame = (idx, use2) => ({ type: NEWGAME, idx, use2 });
export const moveUp = () => ({ type: MOVE, direction: Directions.UP });
export const moveDown = () => ({ type: MOVE, direction: Directions.DOWN });
export const moveLeft = () => ({ type: MOVE, direction: Directions.LEFT });
export const moveRight = () => ({ type: MOVE, direction: Directions.RIGHT });

export const newTile = (idx, use2) => ({ type: NEWTILE, idx, use2 });