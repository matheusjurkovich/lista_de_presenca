/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export function Header(props) {
  return (
    <header className="m-4 w-2/4 flex justify-between items-center">
      <h1 className="text-4xl font-bold">Lista de Presença</h1>

      <div className="flex justify-between items-center">
        <strong>{props.name}</strong>
        <a href="https://github.com/matheusjurkovich">
          <img
            className="w-16 h-16 border rounded-full ml-2"
            src={props.avatar}
            alt="Foto de perfil"
          />
        </a>
      </div>
    </header>
  )
}
