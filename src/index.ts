import { calculateCapsIncomeFromActivity } from './modules/economy/index.js'

console.log("Sistema Pip-Boy v6.0 Iniciado...")

console.log("Iniciando caso de teste: XP Semanal = 0 xp e XP de atividade = 100 xp")

const semana1 = calculateCapsIncomeFromActivity(100, 0)

console.log(semana1)

console.log("Iniciando caso de teste: XP Semanal = 240 xp e XP de atividade = 20 xp")

const semana2 = calculateCapsIncomeFromActivity(20, 240)

console.log(semana2)
console.log("Iniciando caso de teste: XP Semanal = 300 xp e XP de atividade = 50 xp")

const semana3 = calculateCapsIncomeFromActivity(50, 300)

console.log(semana3)