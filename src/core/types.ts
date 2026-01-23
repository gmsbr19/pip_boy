export const VALID_ATTRIBUTE_NAMES = ["STR", "PER", "END", "CHA", "INT", "AGI", "LCK"] as const;

export type AttributeNames = typeof VALID_ATTRIBUTE_NAMES[number]

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

export function isGameState(value: unknown): value is GameState {
    // 1. Verificação básica: É um objeto e não é nulo?
    if (typeof value !== 'object' || value === null) {
        return false;
    }

    // Fazemos um "cast" temporário só para o TS deixar a gente ler as propriedades
    const candidate = value as Record<string, any>;

    // 2. Verificação de Propriedades Obrigatórias
    // "caps" existe E é um número?
    const hasCaps = typeof candidate.caps === 'number';
    
    // "xpHistory" existe E é um objeto?
    const hasHistory = typeof candidate.xpHistory === 'object' && candidate.xpHistory !== null;

    return hasCaps && hasHistory;
}

export function isAttributeName(value:string): value is AttributeNames {
    if (value === null) {
        return false;
    }

    return VALID_ATTRIBUTE_NAMES.includes(value as AttributeNames)
}

export type ParsedLog = {
    originalInput: string,
    cleanDescription: string,
    attributes: Partial<Record<AttributeNames, number>>

}