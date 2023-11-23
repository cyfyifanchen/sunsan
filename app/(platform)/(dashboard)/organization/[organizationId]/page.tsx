import { create } from '@/actions/create-board'

const OrganizationIdPage = () => {
  // async function create(formData: FormData) {
  //   'use server'

  //   const title = formData.get('title') as string

  //   await db.board.create({
  //     data: {
  //       title,
  //     },
  //   })
  // }
  return (
    <div className="">
      <form action={create}>
        <input
          id="title"
          name="title"
          required
          placeholder="Enter a board title"
          className="border-black border p-1"
        />
      </form>
    </div>
  )
}

export default OrganizationIdPage
