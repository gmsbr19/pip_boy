import { CONFIG } from '@/core/config.js';

function calculateCapsIncomeFromActivity(_xpGainedFromActivity:number, _currentWeekXp: number): number {
    const richXpWindow = Math.max(CONFIG.WEEKLY_SOFT_CAP - _currentWeekXp, 0)

    if (_xpGainedFromActivity <= richXpWindow) {
        return _xpGainedFromActivity / CONFIG.STANDARD_RATE
    } else {
        let xpBelowLimit = richXpWindow
        let xpAboveLimit = _xpGainedFromActivity - richXpWindow

        return xpBelowLimit / CONFIG.STANDARD_RATE + xpAboveLimit / CONFIG.OVERTIME_RATE
    }
}