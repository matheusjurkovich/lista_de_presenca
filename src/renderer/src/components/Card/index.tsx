import './style.css'

export type CardProps = {
  name: string
  time: string
}

export function Card(props: CardProps): JSX.Element {
  return (
    <div className="card">
      <strong>{props.name}</strong>
      <small>{props.time}</small>
    </div>
  )
}
