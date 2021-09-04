import { Choice, PromptObject } from "prompts";

export const main_prompt: (
  movement_options: ("north" | "east" | "south" | "west")[],
) => PromptObject = (movement_options) => {
  return {
    name: "choice",
    message: "What action would you like to take?",
    type: "select",
    choices: [
      // {
      //   title: "Move North",
      //   value: "north",
      // },
      // {
      //   title: "Move East",
      //   value: "east",
      // },
      // {
      //   title: "Move South",
      //   value: "south",
      // },
      // {
      //   title: "Move West",
      //   value: "west",
      // },
      ...movement_options.map(
        (v) =>
          ({
            title: `Move ${ProperCase(v)}`,
            value: v.toLowerCase(),
          } as Choice),
      ),
      {
        title: "Explore Current Room",
        value: "explore",
      },
      {
        title: "View Map",
        value: "map",
      },
    ],
  };
};

const ProperCase = (str: string) => {
  return str[0].toUpperCase() + str.slice(1, str.length).toLowerCase();
};
