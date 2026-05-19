import { FC } from "react"
import { inputFieldTypes, sizes } from "../../types";
import { ErrorMessage, Field, FieldProps } from "formik";


interface FieldsComponentProps {
    name: string;
    placeholder: string;
    type: inputFieldTypes;
    paddingTopBottom?: sizes,
    paddingLeftRight?: sizes,
    Onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    minTime?: 'Yes' | 'No';
    readonly?: boolean;
    disabled?: boolean;
    icon?: "Yes" | "No",
    iconPosition?: "left" | "right",
    iconname?: any
}

const FieldsComponent: FC<FieldsComponentProps> = ({
    name,
    placeholder,
    type,
    paddingTopBottom,
    paddingLeftRight,
    Onchange,
    minTime,
    readonly,
    disabled,
    icon,
    iconPosition,
    iconname
}) => {

    const getCurrentDateTime = () => {
        const now = new Date();
        // Format the date to YYYY-MM-DDTHH:MM (for datetime-local)
        return now.toISOString().slice(0, 16);
    };
    return (
        <>
            <Field
                name={name}
                readonly={readonly}
                disabled={disabled}
            >
                {({ field }: FieldProps) => (
                    <div className={`w-full ${icon === 'Yes' ? 'flex items-center' : ''} `}>
                        {icon === 'Yes' && iconPosition === 'left' &&
                            <span className="field__width-icon border-r-0! rounded-r-none!">
                                {iconname}
                            </span>
                        }
                        <input
                            {...field} // Provides Formik's value and onChange automatically
                            type={type}
                            value={field.value ?? ""}
                            data-testid={`input-${name}`}
                            min={minTime === 'Yes' ? getCurrentDateTime() : ''}
                            placeholder={placeholder}
                            autoComplete='off'
                            onChange={Onchange ? Onchange : field.onChange} // Attach custom onChange if provided, fallback to Formik's
                            className={
                                `   
                                    ${paddingTopBottom === 'xs' && 'py-[5px]'}
                                    ${paddingTopBottom === 'sm' && 'py-[12px]'}
                                    ${paddingTopBottom === 'md' && 'py-[13px]'}
                                    ${paddingTopBottom === 'lg' && 'py-[15px]'}
                                    ${paddingTopBottom === 'xl' && 'py-[18px]'}

                                    ${paddingLeftRight === 'xs' && 'px-[5px]'}
                                    ${paddingLeftRight === 'sm' && 'px-[10px]'}
                                    ${paddingLeftRight === 'md' && 'px-[13px]'}
                                    ${paddingLeftRight === 'lg' && 'px-[15px]'}
                                    ${paddingLeftRight === 'xl' && 'px-[18px]'}

                                    ${icon === 'Yes' && iconPosition === 'left' ? 'rounded-l-none! border-l-0!' : ''}
                                    ${icon === 'Yes' && iconPosition === 'right' ? 'rounded-r-none! border-r-0!' : ''}
                                    form-control w-full`
                            }
                            readOnly={readonly}
                            disabled={disabled}
                        />
                    </div>
                )}
            </Field>

            <ErrorMessage
                name={name}
                component="div"
                className='text-[12px] text-red-500'
            />
        </>
    )
}

export default FieldsComponent
