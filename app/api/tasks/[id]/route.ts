import { NextResponse } from 'next/server'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { completed } = await request.json()
    const client = await pool.connect()
    const result = await client.query(
      'UPDATE tasks SET completed = $1 WHERE id = $2 RETURNING *',
      [completed, params.id]
    )
    client.release()
    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 })
    }
    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error('Error updating task:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const client = await pool.connect()
    const result = await client.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [params.id])
    client.release()
    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 })
    }
    return NextResponse.json({ message: 'Task deleted successfully' })
  } catch (error) {
    console.error('Error deleting task:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}