console.clear();

import seed from "seed-random";
import Prompter from "./utils/Prompter/Prompter";
import RandomWalk from "./classes/RandomWalk";
import AdventureGame from "./classes/Adventure";

(async () => {
  const input = await Prompter.seed();
  let test: () => number;
  console.log(input);
  if (input) {
    test = seed(input);
  } else {
    test = seed();
  }

  const rw = new RandomWalk(20, 20, 10, 40, test);

  const [map, pos] = rw.create();
  const game = new AdventureGame(map, pos);
  rw.debug(map, pos);
  // const game = new AdventureGame(...rw.create());

  game.start_game();
})();
