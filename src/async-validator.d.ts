declare namespace AsyncValidator {
    type ValidateTrigger = "onBlur"
    interface RuleRange {
        min: number
        max: number
    }

    interface RuleString {
        type?: "string"
        pattern?: RegExp
        /**字符串长度范围 */
        range?: RuleRange
        /**字符串长度 */
        len?: number
        /**是否忽略空格 */
        whitespace?: boolean
    }

    interface RuleBoolean {
        type?: "boolean"
    }
    interface RuleMethod {
        type?: "method"
    }
    interface RuleRegexp {
        type?: "regexp"
        pattern: RegExp
    }
    interface RuleNumber {
        type?: "number"
        /**数组值大小范围（包含）*/
        range?: RuleRange
        /**小数精度 */
        len?: number
    }
    interface RuleInteger {
        type?: "interger"
        /**数组值大小范围（包含）*/
        range?: RuleRange

    }
    interface RuleFloat extends RuleNumber {
        type?: "float"
    }
    interface RuleArray {
        type?: "array"
        range?: RuleRange
        len?: number
    }
    interface RuleObject {
        type?: "object"
        /**Object 类型深度校验 */
        fields?: {
            [field: string]: Rule | Rule[]
        }
    }
    interface RuleEnum {
        type?: "enum"
        enum: string[]
    }
    interface RuleDate {
        type?: "date"
    }
    interface RuleUrl {
        type?: "url"
    }
    interface RuleHex {
        type?: "hex"
    }
    interface RuleEmail {
        type?: "email"
    }
    interface RuleAny {
        type?: "any"
    }


    type ValidateResult = boolean | Error | Error[]
    interface ValidateFunction<TReturn = ValidateResult> {
        (
            rule: Rule | Rule[],
            value: any,
            callback?: (errors: ValidateResult) => void,
            source?: any,
            options?: { message: string }
        ): TReturn
    }
    type Rule = (RuleString) & {
        required?: boolean
        /**校验前数据清洗 */
        transform?: (value: any) => any
        /**自定义校验 */
        validator?: ValidateFunction
        /**异步校验 */
        asyncValidator?: ValidateFunction<Promise<any>>
        /**校验异常文案,使用Function 方式，用来支如文案动态计算等支出 */
        message?: string | { (): any }
    }
    type RuleType = ValidateFunction | Rule[]
}
declare module "async-validator" {
    export class AsyncValidator<ISource = any>{
        constructor(descriptor: {
            [field: keyof ISource]: AsyncValidator.RuleType
        })
        validate: {
            (
                source: {
                    [field: keyof ISource]: any
                },
                options?: {
                    suppressWarning?: boolean
                    first?: boolean
                    firstFields?: boolean | (keyof ISource)[]
                },
                callback: (errors: any, fields: any) => void
            )
                : Promise<any>
        }
        messages: {
            (any): void
        }
    }
    export default AsyncValidator
}
// export