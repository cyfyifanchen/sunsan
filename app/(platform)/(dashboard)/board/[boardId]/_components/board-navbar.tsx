import { Board } from '@prisma/client'
import { BoardTitleForm } from './board-title-form'

interface BoardNavbarProps {
  data: Board
}
const BoardNavbar = async ({ data }: BoardNavbarProps) => {
  return (
    <div className="w-full h-14 z-[40] bg-black/50 fixed top-14 flex items-center px-6 gap-x-4 text-white">
      <BoardTitleForm data={data} />
    </div>
  )
}

export default BoardNavbar
