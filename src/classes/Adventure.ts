import Node from "./Node";

export default class AdventureGame {

  private current_position: [number, number];
  private move_dirrections: [number, number][] = [[1, 0] /*d*/, [-1, 0] /*u*/, [0, 1] /*r*/, [0, -1] /*l*/]

  constructor(private map: (0 | Node)[][], start_pos: [number, number]) {
    this.current_position = start_pos;
  }

  public start_game() {
    const initialMoves = this.find_moveable_spaces();
    const cardinal_dirrections = this.moves_to_human_readable(initialMoves);

    console.log(`You wake up after a long nights rest to find yourself somewhere where you've clearly never been before.
    You are unsure if you are still dreaming or not. 
    You find yourself stumbling down into a closed room, unsure how you ended up there, you look around. 
    You find that you can only go ${cardinal_dirrections.map((v, i, a) => i === 0 ? v : i === a.length - 1 ? " and " + v : ", " + v).join("")}.
    What do you want to do?`);


  }

  private human_readable_to_move(move: "north" | "south" | "west" | "east") {}

  private moves_to_human_readable(moves: [number, number][]) {
    const cd: string[] = [];
    for (const dir of moves) {
      if (dir[0] === 1 && dir[1] === 0)
        cd.push("South");
      else if (dir[0] === -1 && dir[1] === 0) 
        cd.push("North");
      else if (dir[0] === 0 && dir[1] === 1)
        cd.push("East")
      else cd.push("West");
    }

    console.log(cd)
    return cd;
  }

  private find_moveable_spaces() {
    
    let moveable_dirrections: [number, number][] = [];
    const down = this.move_dirrections[0];
    const up = this.move_dirrections[1];
    const right = this.move_dirrections[2];
    const left = this.move_dirrections[3];

    // Left
    if (this.map[this.current_position[0] + left[0]][this.current_position[1] + left[1]] instanceof Node) {
      moveable_dirrections.push(left);
    }
    // Right
    if (this.map[this.current_position[0] + right[0]][this.current_position[1] + right[1]] instanceof Node) {
      moveable_dirrections.push(right);
    }
    // Up
    if (this.map[this.current_position[0] + up[0]][this.current_position[1] + up[1]] instanceof Node) {
      moveable_dirrections.push(up);
    }
    // Down
    if (this.map[this.current_position[0] + down[0]][this.current_position[1] + down[1]] instanceof Node) {
      moveable_dirrections.push(down);
    }

    return moveable_dirrections as [number, number][]
  }

}