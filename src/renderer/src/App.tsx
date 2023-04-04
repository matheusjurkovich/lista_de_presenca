import { useState, useEffect } from 'react'
import { CardProps, Card } from './components/Card'
import AlertDialogDemo from '@renderer/components/ButtonDelete'
import { Header } from './components/Header'

type ProfileResponse = {
  name: string
  avatar_url: string
}

type User = {
  name: string
  avatar: string
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function App() {
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
    <div className="flex justify-center items-center flex-col mt-40">
      <Header name={user.name} avatar={user.avatar} />
      <input
        className="w-2/4 p-6 rounded-2xl bg-zinc-300 text-black"
        type="text"
        placeholder="Digite o nome..."
        onKeyDown={handleKeyDown}
        value={studentName}
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        onChange={(e) => setStudentName(e.target.value)}
      />

      <div className="flex justify-between w-2/4 gap-4">
        <button
          className="w-[70%] p-6 font-bold bg-green-600 text-white rounded-2xl my-3 text-base items-center hover:brightness-150"
          type="button"
          // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
          onClick={() => {
            handleAddStudent()
            setStudentName('')
          }}
        >
          Adicionar
        </button>
        <AlertDialogDemo click={resetArray} />
      </div>

      {students.map((student) => (
        <Card key={student.time} name={student.name} time={student.time} />
      ))}
    </div>
  )
}
