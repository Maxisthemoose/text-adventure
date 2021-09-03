import prompts from "prompts";
import { main_prompt } from "./prompts";

export default class Prompter {
  public static async main_progression() {
    const { choice } = await prompts(main_prompt);
    return choice as string;
  }
}