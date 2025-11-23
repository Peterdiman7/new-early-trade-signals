import i18n from "@/plugins/i18n"

const preformattedStrings = [
]

const { t: tf } = i18n.global
type FormatFunction = (value: string) => string
type FormatFunctionParam = FormatFunction | Array<FormatFunction>
interface FormatTransalationDefinition {
    (t: typeof tf, translationKey: string, formatFunctions?: FormatFunctionParam): string
    (t: typeof tf, translationKey: string, interpolationArgs?: Record<string, any>, formatFunctions?: FormatFunctionParam): string
}
const isFormatFunction = (value: Record<string, any> | FormatFunctionParam): value is FormatFunctionParam => typeof value === "function" || Array.isArray(value)
export const formatTranslation: FormatTransalationDefinition = (t: typeof tf, translationKey: string, interpolationArgs?: unknown, formatFunctions?: FormatFunctionParam) => {
    const _formatFunctions: FormatFunctionParam | undefined =
        formatFunctions !== undefined ? formatFunctions :
            (interpolationArgs !== undefined && isFormatFunction(interpolationArgs as Record<string, any> | FormatFunctionParam) ?
                interpolationArgs as FormatFunctionParam : undefined)
    const _interpolationArgs: Record<string, any> | undefined =
        interpolationArgs !== undefined && !isFormatFunction(interpolationArgs as Record<string, any> | FormatFunctionParam) ? interpolationArgs as Record<string, any> : undefined
    let returnValue: string = _interpolationArgs !== undefined ? t(translationKey, _interpolationArgs) : t(translationKey)
    if (_formatFunctions && !preformattedStrings.includes(translationKey)) {
        if (Array.isArray(_formatFunctions))
            _formatFunctions?.forEach(formatFunction => returnValue = formatFunction(returnValue))
        else
            returnValue = _formatFunctions(returnValue)
    }

    return returnValue
}
