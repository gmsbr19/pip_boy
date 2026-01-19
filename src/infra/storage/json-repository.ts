import type { IPipBoyRepository } from "@/core/interfaces.js";
import { JSON_DB_PATH } from "@/core/config.js";
import { isGameState, type GameState } from "@/core/types.js";
import fs from 'fs/promises';

export class JsonRepository implements IPipBoyRepository {
    async saveData(gameState: GameState): Promise<void> {
        return fs.writeFile(JSON_DB_PATH, JSON.stringify(gameState, null, 2))
    }

    async loadData(): Promise<GameState> {
        try {
            const content = await fs.readFile(JSON_DB_PATH, "utf-8")
            const rawData: unknown = JSON.parse(content)
            
            if (isGameState(rawData)) {
                return rawData
            } else {
                throw Error
            }
        }
        catch(error) {
            if (error.code == 'ENOENT') {
                const zeroState: GameState = {caps: 0, xpHistory: {STR: 0, PER: 0, END: 0, CHA: 0, INT: 0, AGI: 0, LCK: 0}}
                return zeroState
            } else {
                throw error
            }
        }
    }
}