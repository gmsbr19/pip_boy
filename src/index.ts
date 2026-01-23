import type { GameState } from './core/types.js'
import { JsonRepository } from './infra/storage/json-repository.js'
import { calculateCapsIncomeFromActivity } from './modules/economy/index.js' // Verifique se o nome está certo

async function main() {
    try {
        const repository = new JsonRepository()
        
        console.log("📂 Carregando dados...")
        const gameState = await repository.loadData()

        console.log("🎮 Simulando jogabilidade...")
        gameState.caps += -90
        gameState.xpHistory.LCK += 90

        console.log("💾 Salvando...")
        await repository.saveData(gameState)

        console.log("💪 Simulando treino...")
        // ATENÇÃO: Verifique se sua função calculateCapsIncomeFromActivity aceita (number, number)
        const renda = calculateCapsIncomeFromActivity(45, gameState.xpHistory.STR) 
        gameState.caps += renda
        gameState.xpHistory.STR += 45

        await repository.saveData(gameState)

        console.log("✅ Estado Final:", gameState)

    } catch (error) {
        console.error("🔥 ERRO FATAL:", error.message || error)
    }
}

main()