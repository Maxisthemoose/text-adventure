import { timingSafeEqual } from "crypto";
import Item from "../utils/interfaces/Item";
import player from "../utils/interfaces/Player";
import Weapon from "../utils/interfaces/Weapon";

export default class Player implements player {
  public alive = true;
  public currentHP = 100;
  public items: Item[] = [];
  public maxHP = 100;
  public weapons: Weapon[] = [];

  constructor() {}

  public take_damage(damage: number) {
    this.currentHP -= damage;
    if (this.currentHP <= 0) this.die();
  }

  public die() {
    this.alive = false;
  }

  public heal(health: number) {
    this.currentHP += health;
    if (this.currentHP > this.maxHP) this.currentHP = this.maxHP;
  }

  public add_item(item: Item) {
    this.items.push(item);
  }

  public use_item(item: Item) {
    switch (item.attribute) {
    }
  }
}
