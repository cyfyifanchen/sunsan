import { UserButton, auth, currentUser } from '@clerk/nextjs'

const ProtectedPage = async () => {
  // by default, all the components are server components
  const user = await currentUser()
  const { userId } = auth()

  return (
    <div className="">
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}

export default ProtectedPage
