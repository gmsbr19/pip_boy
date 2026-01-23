import { CONFIG } from '@/core/config.js';

export function calculateCapsIncomeFromActivity(_xpGainedFromActivity:number, _currentWeekXp: number): number {
    const richXpWindow = Math.max(CONFIG.WEEKLY_SOFT_CAP - _currentWeekXp, 0)

    if (_xpGainedFromActivity <= richXpWindow) {
        return Math.round(_xpGainedFromActivity / CONFIG.STANDARD_RATE)
    } else {
        let xpBelowLimit = richXpWindow
        let xpAboveLimit = _xpGainedFromActivity - richXpWindow

        return Math.round(xpBelowLimit / CONFIG.STANDARD_RATE + xpAboveLimit / CONFIG.OVERTIME_RATE)
    }
}