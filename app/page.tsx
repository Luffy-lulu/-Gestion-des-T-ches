import TaskList from '@/components/TaskList'
import AddTaskForm from '@/components/AddTaskForm'

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Gestionnaire de Tâches</h1>
      <AddTaskForm />
      <TaskList />
    </main>
  )
}