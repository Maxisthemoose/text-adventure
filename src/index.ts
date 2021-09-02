import RandomWalk from "./classes/RandomWalk";
import AdventureGame from "./classes/Adventure";
const rw = new RandomWalk(30, 30, 10, 100);

const [map, pos] = rw.create();

console.log(rw.debug(map, pos));

const game = new AdventureGame(map, pos);

game.start_game();