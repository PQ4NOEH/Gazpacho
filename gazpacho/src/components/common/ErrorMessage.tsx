import React from 'react'
type ErrorMessageProps = {
    ariaDescribedby: string;
    ariaLabel: string;
    message: string
}
export default function ErrorMessage({
    ariaDescribedby,
    ariaLabel,
    message
}: ErrorMessageProps) {
    return (
        <p
            aria-describedby={ariaDescribedby}
            aria-label={ariaLabel}
            role="alert"
            className='error-message'>
            {message}
        </p>
    )
}
