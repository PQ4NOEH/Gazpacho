import { ReactNode } from 'react'

interface FieldsetProps {
    legend: string
    children?: ReactNode
}
export default function Fieldset({ legend, children }: FieldsetProps) {
    return (
        <fieldset>
            <legend>{legend}</legend>
            {children}
        </fieldset>
    )
}
