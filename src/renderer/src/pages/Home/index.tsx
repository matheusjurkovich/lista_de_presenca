import { useState, useEffect } from 'react'
import './style.css'
import { CardProps, Card } from '../../components/Card'

type ProfileResponse = {
  name: string
  avatar_url: string
}

type User = {
  name: string
  avatar: string
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function Home() {
  const [studentName, setStudentName] = useState('')
  const [students, setStudents] = useState<CardProps[]>([])
  const [user, setUser] = useState<User>({} as User)

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function handleAddStudent() {
    if (!studentName.trim()) {
      return
    }
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString('pt-br', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }
    setStudents((prevState) => {
      const newStudents = [...prevState]
      newStudents.unshift(newStudent)
      return newStudents
    })
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async function fetchData() {
      const response = await fetch('https://api.github.com/users/matheusjurkovich')
      const data = (await response.json()) as ProfileResponse
      setUser({
        name: data.name,
        avatar: data.avatar_url
      })
    }

    fetchData()
  }, [])

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      handleAddStudent()
      setStudentName('')
    }
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function resetArray() {
    setStudents([])
  }

  return (
    <div className="container">
      <header>
        <h1>Lista de Presença</h1>

        <div>
          <strong>{user.name}</strong>
          <a href="https://github.com/matheusjurkovich">
            <img src={user.avatar} alt="Foto de perfil" />
          </a>
        </div>
      </header>

      <input
        type="text"
        placeholder="Digite o nome..."
        onKeyDown={handleKeyDown}
        value={studentName}
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        onChange={(e) => setStudentName(e.target.value)}
      />

      <div className="buttonBox">
        <button
          type="button"
          // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
          onClick={() => {
            handleAddStudent()
            setStudentName('')
          }}
        >
          Adicionar
        </button>
        <button type="button" onClick={resetArray}>
          Limpar
        </button>
      </div>

      {students.map((student) => (
        <Card key={student.time} name={student.name} time={student.time} />
      ))}
    </div>
  )
}
