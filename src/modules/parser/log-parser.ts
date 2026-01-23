import { isAttributeName, type ParsedLog } from "@/core/types.js"

const ATTRIBUTE_MATCH_REGEX = /(\w*)::(\d*)/gm

export function parseLogInput(_rawText: string): ParsedLog {
    const regexMatch = _rawText.matchAll(ATTRIBUTE_MATCH_REGEX)

    const matchArray = clearMatchArray(regexMatch)

    const attributesMap = matchArray.map(([key, value]) => [
        key?.toUpperCase(),
        Number(value)
    ]).filter(([key, value]) => isAttributeName(key as string))
    
    const attributesObj = Object.fromEntries(attributesMap);

    const parsedLog: ParsedLog = {
        originalInput: _rawText,
        cleanDescription: clearDescription(_rawText),
        attributes: attributesObj
    }

    console.log(parsedLog.cleanDescription)

    return parsedLog
}

function clearMatchArray(_iterator:RegExpStringIterator<RegExpExecArray>): string[][] {
    const expExecArray = [..._iterator]

    const cleanArray = expExecArray.map(current => current.slice(1,3))

    return cleanArray
}

function clearDescription(_description:string): string {
    const cleanDescription = _description.replaceAll(ATTRIBUTE_MATCH_REGEX, "").replaceAll(/\s\s+/g, ' ').trim()

    return cleanDescription
}

const result = parseLogInput("Fiz yoga por 10 min agi::10 e treinei por 20 min str::20 e banana::11")
console.log(result)