export type CardProps = {
  name: string
  time: string
}

export function Card(props: CardProps): JSX.Element {
  return (
    <div className="h-20 max-w-2xl bg-violet-600 text-white border rounded-3xl mb-5 p-6 flex items-center justify-center gap-8">
      <strong className="text-xl">{props.name}</strong>
      <small className="text-base">{props.time}</small>
    </div>
  )
}
