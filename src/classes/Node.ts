import Enemy from "../utils/interfaces/Enemy";
import Object_ from "../utils/interfaces/Object_";
import Item from "../utils/interfaces/Item";

import enemy_list from "../utils/enemy_list";
import items_list from "../utils/items_list";
import objects from "../utils/objects";

export default class Node {
  public objects: Object_[] = [];
  public enemies: Enemy[] = [];
  public items: Item[] = [];
  public description: string = "";
  public enterText: string = "";

  constructor(public difficulty: 0 | 1) {
    this.init();
  }

  private init() {
    if (this.difficulty === 1) {
      const numEnemies = Math.floor(Math.random() * 2) + 1;
      for (let i = 0; i < numEnemies; i++)
        this.enemies.push(
          enemy_list[this.random(enemy_list.length, 0)],
        );
    }

    this.items.push(items_list[this.random(items_list.length, 0)]);
    this.objects.push(objects[this.random(objects.length, 0)]);

  }

  private random(max: number, min: number) {
    return Math.floor(Math.random() * max) + min;
  }
}
