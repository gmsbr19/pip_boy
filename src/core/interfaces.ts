import type { GameState } from "./types.js";

export interface IPipBoyRepository {
    loadData():Promise<GameState>,
    saveData(gameState: GameState):Promise<void>
}