
// import * as V from 'async-validator '
// export = RCForm
// export as namespace RCForm
declare namespace RCForm {
    type PickOne<T, P extends keyof T> = T[P]
    type ValidateTrigger = "onBlur"

    interface RCFormOptions {

    }
    interface FieldOptions<TSource = any, TName extends keyof TSource = keyof TSource> {
        /**字段名 */
        valuePropName?: string
        rules?: AsyncValidator.RuleType
        validateFirst?: boolean
        validate?: {
            [n: string | number]: {
                trigger: ValidateTrigger
                rules: AsyncValidator.RuleType
            }
        }
        getValueProps?: any
        /**当表单组件变化时用户计算Filed的值（多用于自定义组件） */
        getValueFromEvent?: {
            (event: React.SyntheticEvent): void
        }
        onChange?: {
            (event: React.SyntheticEvent): void
        }
        /**初始化值 */
        initialValue?: PickOne<TSource, TName>
        normalize?: any
        trigger?: any
        CalidateTrigger?: ValidateTrigger

        hidden?: any
        preserve?: any

    }
    interface CreateFromOptions {
        validateMessages?: any
        onFieldsChange?: any
        onValuesChange?: any
        mapProps?: any
        mapPropsToFields?: any
        fieldNameProp?: any
        fieldMetaProp?: any
        fieldDataProp?: any
        withRef?: any
    }
    interface FormInstance<TSource = any> {
        /**设置初始化数据 */
        setFieldsInitialValue: (values: Partial<TSource>) => void
        // getFieldDecorator
        setFieldsValue: (values: Partial<TSource>) => void
        validateFields: {
            <TName extends keyof TSource = string>(
                callback: {
                    (
                        error: {
                            error: {
                                [TField in TName]: {
                                    errors: Array<{
                                        message: string,
                                        field: TField
                                    }>
                                }
                            },
                            fields: TSource
                        },
                        values: TSource
                    ): void
                }
            ): void
        }
        /**组件修饰器，一般有做处理自定义组件 */
        getFieldDecorator: {
            <TName extends keyof TSource = string>(
                name: TName,
                options?: FieldOptions<TSource, TName>
            ): {
                (node: React.ReactNode): React.ReactNode
            }
        }
        getFieldProps: {
            <TName extends keyof TSource = string>(
                name: TName,
                options?: FieldOptions<TSource, TName>
            ): RCFormOptions
        }
        getFieldsValue: {
            <TName extends keyof TSource = keyof TSource>(names: TName[]): {
                [TField in TName]: PickOne<TSource, TField>
            }
        }
        getFieldError: (name: keyof TSource) => string[] | null
        getAllValues: () => TSource
    }
    type FormProps<T = any, TSource = any> = T & {
        /**RCForm 表单 */
        form: RCForm.FormInstance<TSource>
    }

    interface FC<T = any, TSource = any> extends React.FC<FormProps<T, TSource>> {
    }
    interface ComponentType<T = any, TSource = any> extends React.ComponentType<FormProps<T, TSource>> {
    }
}

declare module "rc-form" {
    export function createForm<IProps = any>(option?: RCForm.CreateFromOptions): <T = IProps>(c: RCForm.ComponentType<T>) => React.ComponentType<T>
}