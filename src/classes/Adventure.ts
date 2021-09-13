import Node from "./Node";
import { Node_ } from "../utils/interfaces/Node_";
import Prompter from "../utils/Prompter/Prompter";
import Player from "./Player";

export default class AdventureGame {
  private current_position: [number, number];
  private move_dirrections: [number, number][] = [
    [1, 0] /*d*/,
    [-1, 0] /*u*/,
    [0, 1] /*r*/,
    [0, -1] /*l*/,
  ];
  // private alive: boolean = true;

  private player = new Player();

  constructor(private map: Node_, start_pos: [number, number]) {
    this.current_position = start_pos;

    if (this.map[start_pos[0]][start_pos[1]] === 1) {
      this.map[start_pos[0]][start_pos[1]] = new Node(0);
    }
  }

  public start_game() {
    this.set_node_as_explored();

    console.log(`You wake up after a long nights rest to find yourself somewhere where you've clearly never been before.
You are unsure if you are still dreaming or not. 
You find yourself stumbling down into a room, unsure how you ended up there, you look around. 
`);

    this.game_loop();
  }

  private async game_loop() {
    while (this.player.alive) {
      const moves = this.find_moveable_spaces();
      const cardinal_dirrections = this.moves_to_human_readable(moves);

      console.log(
        `In this room you see ${
          (this.map[this.current_position[0]][this.current_position[1]] as Node)
            .description
        }`,
      );
      console.log(
        `You find that you can only go ${cardinal_dirrections
          .map((v, i, a) =>
            i === 0 ? v : i === a.length - 1 ? " and " + v : ", " + v,
          )
          .join("")}.`,
      );

      const response = await Prompter.main_progression(
        cardinal_dirrections as ("north" | "east" | "south" | "west")[],
      );

      const move = this.human_readable_to_move(response);
      if (move === 0) {
        this.view_map_as_player();
        console.log(
          "You have now viewed the current map, what would you like to do now?",
        );
        continue;
      } else if (move === null) {
        this.explore_node();
        continue;
      } else {
        this.move_player(move);
        continue;
      }
    }
  }

  private move_player(dir: [number, number]) {
    const human_readable = this.moves_to_human_readable([dir])[0];
    this.current_position[0] += dir[0];
    this.current_position[1] += dir[1];

    this.set_node_as_explored();

    console.log(`You moved ${human_readable} one space!`);

    if (
      (this.map[this.current_position[0]][this.current_position[1]] as Node)
        .difficulty === 1
    ) {
      console.log("There is an enemy now");
    }
  }

  private set_node_as_explored() {
    if (
      this.map[this.current_position[0]] &&
      this.map[this.current_position[0]][this.current_position[1]] instanceof
        Node
    ) {
      (
        this.map[this.current_position[0]][this.current_position[1]] as Node
      ).explored = true;
    }
  }

  private explore_node() {
    console.clear();

    const curr_node = this.map[this.current_position[0]][
      this.current_position[1]
    ] as Node;

    if (curr_node.weapons.length > 0) {
      for (const weapon of curr_node.weapons) {
        this.player.weapons.push(weapon);
        console.log(
          `You found a ${weapon.name}! It does ${weapon.damage} damage!`,
        );
        curr_node.weapons.splice(
          curr_node.weapons.findIndex((v) => v.name === weapon.name),
          1,
        );
      }
    } else console.log("You didn't find any weapons!");

    if (curr_node.items.length > 0) {
      for (const item of curr_node.items) {
        this.player.items.push(item);
        console.log(`You found a ${item.name}! It has the "${item.attribute}" attribute!`);
        curr_node.items.splice(
          curr_node.items.findIndex(v => v.name === item.name),
          1
        );
      }
    } else console.log("You didn't find any items!");
  }

  private view_map_as_player() {
    console.clear();
    const map = this.map;
    let str = "";

    for (let i = 0; i < map.length; i++) {
      let tmp = "";
      for (let j = 0; j < map[0].length; j++) {
        if (map[i][j] === 1) tmp += "🟫";
        else if (map[i][j] instanceof Node) {
          if ((map[i][j] as Node).explored) tmp += "🟩";
          else tmp += "🟫";
        } else {
          console.log("neither?");
        }
      }
      str += `${tmp}\n`;
    }

    console.log(str);
  }

  private human_readable_to_move(
    move: "north" | "south" | "west" | "east" | "explore" | "map",
  ): [number, number] | null | 0 {
    if (move === "east") return [0, 1];
    else if (move === "west") return [0, -1];
    else if (move === "north") return [-1, 0];
    else if (move === "south") return [1, 0];
    else if (move === "explore") return null;
    else if (move === "map") return 0;
    else throw new Error("Invalid Move");
  }

  private moves_to_human_readable(moves: [number, number][]) {
    const cd: string[] = [];
    for (const dir of moves) {
      if (dir[0] === 1 && dir[1] === 0) cd.push("South");
      else if (dir[0] === -1 && dir[1] === 0) cd.push("North");
      else if (dir[0] === 0 && dir[1] === 1) cd.push("East");
      else cd.push("West");
    }
    return cd;
  }

  private find_moveable_spaces() {
    let moveable_dirrections: [number, number][] = [];
    const down = this.move_dirrections[0];
    const up = this.move_dirrections[1];
    const right = this.move_dirrections[2];
    const left = this.move_dirrections[3];

    // Left
    if (
      this.map[this.current_position[0] + left[0]] &&
      this.map[this.current_position[0] + left[0]][
        this.current_position[1] + left[1]
      ] instanceof Node
    ) {
      moveable_dirrections.push(left);
    }
    // Right
    if (
      this.map[this.current_position[0] + right[0]] &&
      this.map[this.current_position[0] + right[0]][
        this.current_position[1] + right[1]
      ] instanceof Node
    ) {
      moveable_dirrections.push(right);
    }
    // Up
    if (
      this.map[this.current_position[0] + up[0]] &&
      this.map[this.current_position[0] + up[0]][
        this.current_position[1] + up[1]
      ] instanceof Node
    ) {
      moveable_dirrections.push(up);
    }
    // Down
    if (
      this.map[this.current_position[0] + down[0]] &&
      this.map[this.current_position[0] + down[0]][
        this.current_position[1] + down[1]
      ] instanceof Node
    ) {
      moveable_dirrections.push(down);
    }

    return moveable_dirrections as [number, number][];
  }
}
