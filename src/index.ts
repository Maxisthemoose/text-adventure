import RandomWalk from "./classes/RandomWalk";

const rw = new RandomWalk(30, 30, 10, 100);

const [map, pos] = rw.create();

console.log(rw.debug(map, pos));
