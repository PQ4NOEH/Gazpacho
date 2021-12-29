import { ReactNode } from 'react'

import '../../../index.css'

interface IconButtonProps {
    icon: ReactNode
    title: string
    onClick: () => void
}
export default function IconButton({ icon, title, onClick }: IconButtonProps) {
    return (
        <button
            aria-label={title}
            className="text-rose-600 text-2xl"
            title={title}
            onClick={onClick}
        >
            {icon}
        </button>
    )
}
