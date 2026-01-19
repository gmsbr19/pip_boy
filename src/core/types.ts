export type AttributeNames = "STR" | "PER" | "END" | "CHA" | "INT" | "AGI" | "LCK"

export type LevelLabel = "Dweller" | "Explorer" | "Ranger" | "Knight" | "Paladin" | "Overseer"

export type ActivityLog = {
    id: string;        // UUID para identificar unicamente
    date: Date;
    type: 'XP' | 'TASK' | 'MANUAL'; // Diferencia treino de tarefa
    attribute?: Attribute;          // Só existe se type for XP
    value: number;     // Qtd de XP (se treino) ou Valor fixo (se tarefa)
    description: string;
    isHard?: boolean;  // Para tasks #hard
}

export type User = {
    name: string,
    attributes: Record<AttributeNames, number>,
    activityLogs: ActivityLog[],
    currentCaps: number
}

export type Attribute = {
    name: AttributeNames,
    currentXp: number,
    xpToNextLevel: number,
    currentLevelLabel: LevelLabel,
    currentLevel: number,
    overdrive: boolean,
}

export type GameState = {
    caps: number;
    xpHistory: Record<AttributeNames, number>; // Total acumulado de XP por atributo
}