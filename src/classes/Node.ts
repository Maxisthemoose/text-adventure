import Enemy from "../utils/interfaces/Enemy";
import Object_ from "../utils/interfaces/Object_";
import Weapon from "../utils/interfaces/Weapon";
import Item from "../utils/interfaces/Item";
import Boss from "../utils/interfaces/Boss";

import enemy_list from "../utils/enemy_list";
import objects from "../utils/objects";
import weapons from "../utils/weapons";
import items from "../utils/items";
import bosses from "../utils/bosses";

export default class Node {
  public objects: Object_[] = [];
  public enemies: Enemy[] = [];
  public boss: Boss;
  public weapons: Weapon[] = [];
  public items: Item[] = [];
  public description: string = "";
  public enterText: string = "";
  public explored: boolean = false;

  constructor(public difficulty: 0 | 1 | 2) {
    this.init();
  }

  private init() {
    if (this.difficulty > 0) {
      const numEnemies = Math.floor(Math.random() * 2) + 1;
      for (let i = 0; i < numEnemies; i++)
        this.enemies.push(enemy_list[this.random(enemy_list.length, 0)]);

      if (this.difficulty === 2) {
        this.boss = Math.floor(this.random(bosses.length, 0));
      }
    }

    this.weapons.push(weapons[this.random(weapons.length, 0)]);
    this.objects.push(objects[this.random(objects.length, 0)]);
  }

  private random(max: number, min: number) {
    return Math.floor(Math.random() * max) + min;
  }
}
