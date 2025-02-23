import { PropsWithChildren } from 'react'

interface CardProps extends PropsWithChildren {
  className?: string
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={`rounded border border-neutral-700 bg-neutral-800 p-3 ${
        className ? className : ''
      }`}
    >
      {children}
    </div>
  )
}
