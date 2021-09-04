import prompts from "prompts";
import { main_prompt } from "./prompts";

export default class Prompter {
  public static async main_progression(
    move_options: ("north" | "east" | "south" | "west")[],
  ) {
    const { choice } = await prompts(main_prompt(move_options));
    return choice as "north" | "east" | "south" | "west" | "explore" | "map";
  }
}
