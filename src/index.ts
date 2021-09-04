console.clear();

import RandomWalk from "./classes/RandomWalk";
import AdventureGame from "./classes/Adventure";
const rw = new RandomWalk(10, 10, 4, 40);

// const [map, pos] = rw.create();
// const game = new AdventureGame(map, pos);
// rw.debug(map, pos);
const game = new AdventureGame(...rw.create());

game.start_game();
