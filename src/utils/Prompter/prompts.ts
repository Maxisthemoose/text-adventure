import { PromptObject } from "prompts";

export const main_prompt: PromptObject = {
  name: "choice",
  message: "What action would you like to take?",
  type: "select",
  choices: [
    {
      title: "Move North",
      value: "north",
    },
    {
      title: "Move East",
      value: "east",
    },
    {
      title: "Move South",
      value: "south",
    },
    {
      title: "Move West",
      value: "west",
    },
    {
      title: "Explore Current Room",
      value: "explore",
    },
  ]
}