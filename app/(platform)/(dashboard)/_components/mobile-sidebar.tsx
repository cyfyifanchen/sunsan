'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { useMobileSidebar } from '@/hooks/use-mobile-sidebar'
import { Menu } from 'lucide-react'
import { useParams, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Sidebar } from './sidebar'

export const MobileSidebar = () => {
  const pathname = usePathname()
  // Hook here force to render this part on the client side avoiding hydration error
  const [isMounted, setIsMounted] = useState(false)

  const onOpen = useMobileSidebar((state) => state.onOpen)
  const onClose = useMobileSidebar((state) => state.onClose)
  const isOpen = useMobileSidebar((state) => state.isOpen)

  // Hook here force to do this on the client avoiding hydration error
  // that come from server side rendering
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Whenever URL changes, mobile sidebar will close
  useEffect(() => {
    onClose()
  }, [pathname, onClose])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <Button
        size="sm"
        onClick={onOpen}
        variant="ghost"
        className="block md:hidden mr-2"
      >
        <Menu className="h-4 w-4" />
      </Button>
      <Sheet
        open={isOpen}
        onOpenChange={onClose}
      >
        <SheetContent
          side="left"
          className="p-2 pt-10"
        >
          <Sidebar storageKey="t-sidebar-mobile-state" />
        </SheetContent>
      </Sheet>
    </>
  )
}
