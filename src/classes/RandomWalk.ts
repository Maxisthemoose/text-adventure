import Node from "./Node";
import { Node_ } from "../utils/interfaces/Node_";

const dif = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2];
export default class RandomWalk {
  private dirrections = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  constructor(
    private h: number,
    private w: number,
    private maxLeng: number,
    private tunnels: number,
    private seed: () => number,
  ) {
    Math.random = seed;
  }

  public debug(map: Node_, location: [number, number]): string {
    let str = "";
    for (let i = 0; i < map.length; i++) {
      let tmpstr = "";
      for (let j = 0; j < map[0].length; j++) {
        if (i === location[0] && j === location[1]) {
          tmpstr += "🟦";
        } else {
          if (map[i][j] instanceof Node) {
            if ((map[i][j] as Node).difficulty === 0) {
              tmpstr += "🟩";
            } else if ((map[i][j] as Node).difficulty === 1) {
              tmpstr += "🟧";
            } else {
              tmpstr += "🟥";
            }
            // console.log(map[i][j]);
          } else tmpstr += "🟫";
        }
      }
      tmpstr += "\n";
      str += tmpstr;
    }

    console.log(str);

    return str;
  }

  public debug_explored(map: Node_) {}

  public create(): [Node_, [number, number]] {
    return this.changeMap(this.generateMap());
  }

  private generateMap(): Node_ {
    let arr: 1[][] = [];
    for (let i = 0; i < this.w; i++) {
      arr.push([]);
      for (let j = 0; j < this.h; j++) {
        arr[i].push(1);
      }
    }
    //@ts-ignore
    return arr;
  }

  private randomStart(): [number, number] {
    return [
      Math.floor(Math.random() * this.w),
      Math.floor(Math.random() * this.h),
    ];
  }

  private changeMap(startMap: Node_): [Node_, [number, number]] {
    let pos = this.randomStart();
    const initPos = pos;
    let lastMove = [0, 0];

    for (let i = 0; i < this.tunnels; i++) {
      const walkLeng = Math.floor(Math.random() * this.maxLeng) + 1;
      let dirChoice = Math.floor(Math.random() * this.dirrections.length);
      let dirrection = this.dirrections[dirChoice];

      while (lastMove[0] === dirrection[0] && lastMove[1] === dirrection[1]) {
        dirChoice = Math.floor(Math.random() * this.dirrections.length);
        dirrection = this.dirrections[dirChoice];
      }

      if (
        !startMap[pos[0] + dirrection[0]] ||
        !startMap[pos[0] + dirrection[0]][pos[1] + dirrection[1]]
      ) {
        if (dirChoice === 0 || dirChoice === 1)
          dirChoice = Math.floor(Math.random() * 2) + 2;
        else dirChoice = Math.floor(Math.random() * 2) + 1;

        dirrection = this.dirrections[dirChoice];
      }

      lastMove = dirrection;

      for (let j = 0; j < walkLeng; j++) {
        if (
          pos[0] + dirrection[0] < 0 ||
          pos[1] + dirrection[1] < 0 ||
          pos[0] + dirrection[0] > this.w - 1 ||
          pos[1] + dirrection[1] > this.h - 1
        ) {
          break;
        }

        const node = new Node(
          dif[Math.floor(Math.random() * dif.length)] as 0 | 1 | 2,
        );

        startMap[pos[0]][pos[1]] = node;
        pos[0] += dirrection[0];
        pos[1] += dirrection[1];
      }
    }

    return [startMap, initPos];
  }
}
