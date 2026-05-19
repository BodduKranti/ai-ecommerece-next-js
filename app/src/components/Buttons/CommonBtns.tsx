import { FC } from "react"

interface CommonBtnspro {
    btnText: any,
    onClick?: any,
    type: 'submit' | 'button',
    btnIcon?: any,
    btnIconSide?: 'left' | 'right',
    className?: any,
    disabled?: boolean,
    buttonType: 'btn-primary' | 'btn-danger' | 'btn-success' | 'btn-secondary' | 'btn-cancel' | 'btn-dashboard' | 'btn-activate'
}

const CommonBtns: FC<CommonBtnspro> = ({
    btnText,
    onClick,
    type,
    btnIcon,
    btnIconSide,
    className,
    disabled,
    buttonType
}) => {
    return (
        disabled === true ?
            <button
                type={type}
                onClick={onClick}
                className={`${disabled ? 'opacity-45' : ''} ${className ? className : 'w-auto'} btn ${buttonType}`}
                disabled={disabled}
            >
                {btnIconSide === 'left' && btnIcon}
                {btnText}
                {btnIconSide === 'right' && btnIcon}
                <span className="shimmer"></span>
            </button>
            :
            <button
                type={type}
                onClick={onClick}
                className={`${className ? className : 'w-auto'} btn ${buttonType}`}
            >
                {btnIconSide === 'left' && btnIcon}
                {btnText}
                {btnIconSide === 'right' && btnIcon}
                <span className="shimmer"></span>
            </button>
    )
}

export default CommonBtns
