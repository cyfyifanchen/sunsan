'use client'

// This component and everything inside in only rendered on the client to avoid the hydration error
import { useEffect, useState } from 'react'
import { CardModal } from '../modals/card-modal'
import { ProModal } from '../modals/pro-modal'

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <>
      <CardModal />
      <ProModal />
    </>
  )
}
