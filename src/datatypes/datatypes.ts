// GameTypes that could be played
export enum GameType {
  SauGras,
  SauSchell,
  SauEichel,
  SoloHerz,
  SoloGras,
  SoloSchell,
  SoloEichel,
  Wenz,
  Ramsch
}

// Game represents one game played
export interface Game {
  participants: number[];
  player: number;
  playmate: number;

  gameType: GameType;
  points: number;
  schwarz: boolean;
}

export interface User {
  id: number;
  username: string;
  name: string;
}
