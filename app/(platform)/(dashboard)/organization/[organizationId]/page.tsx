import { create } from '@/actions/create-board'
import { Button } from '@/components/ui/button'
import { db } from '@/lib/db'
import { Board } from './board'

const OrganizationIdPage = async () => {
  const boards = await db.board.findMany()
  return (
    <div className="flex flex-col space-y-4">
      <form action={create}>
        <input
          id="title"
          name="title"
          required
          placeholder="Enter a board title"
          className="border-black border p-1"
        />
        <Button type="submit">Submit</Button>
      </form>
      <div className="space-y-2">
        {boards.map((board) => (
          <Board
            key={board.id}
            title={board.title}
            id={board.id}
          />
        ))}
      </div>
    </div>
  )
}

export default OrganizationIdPage
