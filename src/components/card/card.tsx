import { PropsWithChildren } from 'react'

export const Card = ({ children }: PropsWithChildren) => {
  return (
    <div className="rounded border border-neutral-700 bg-neutral-800 p-3">
      {children}
    </div>
  )
}
