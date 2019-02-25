// GameTypes that could be played
export enum GameType {
  "Sauspiel Gras",
  "Sauspiel Schell",
  "Sauspiel Eichel",
  "Solo Herz",
  "Solo Gras",
  "Solo Schell",
  "Solo Eichel",
  "Wenz",
  "Ramsch"
}

// Game represents one game played
export interface Game {
  participants: number[];
  player: number;
  playmate: number;

  gameType: GameType;
  virgins: number;
  runners: number;
  points: number;
  schwarz: boolean;
}

export interface User {
  id: number;
  username: string;
  name: string;
}
