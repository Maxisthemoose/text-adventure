import Item from "./Item";
import Weapon from "./Weapon";

export default interface Player {
  currentHP: number;
  maxHP: number;
  weapons: Weapon[];
  items: Item[];
  alive: boolean;
}
