'use client'

import { ListWithCards } from '@/type'
import { ListForm } from './list-form'
import { useEffect, useState } from 'react'
import { ListItem } from './list-item'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { useAction } from '@/hooks/use-action'
import { updateListOrder } from '@/actions/update-list-order'
import { toast } from 'sonner'

interface ListContainerProps {
  data: ListWithCards[]
  boardId: string
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const res = Array.from(list)
  const [removed] = res.splice(startIndex, 1)
  res.splice(endIndex, 0, removed)

  return res
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data)

  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onSuccess: () => {
      toast.success('List reordered')
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  useEffect(() => {
    setOrderedData(data)
  }, [data])

  const onDragEnd = (res: any) => {
    const { destination, source, type } = res

    if (!destination) return

    // If drop in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    // If move a list
    if (type === 'list') {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      )

      setOrderedData(items)
      executeUpdateListOrder({ items, boardId })
    }

    // If move a card

    if (type === 'card') {
      let newOrderedData = [...orderedData]

      // Source
      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      )

      // dest list
      const destList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      )

      if (!sourceList || !destList) return

      // If cards exist on the sourceList
      if (!sourceList.cards) {
        sourceList.cards = []
      }

      // If cards exist on the destList
      if (!destList.cards) {
        destList.cards = []
      }

      // If move the card in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        )

        reorderedCards.forEach((card, index) => {
          card.order = index
        })

        sourceList.cards = reorderedCards

        setOrderedData(newOrderedData)

        // Move card to another list
      } else {
        // Remove card from source list
        const [moveCard] = sourceList.cards.splice(source.index, 1)

        // Assign the new listId to the moved card
        moveCard.listId = destination.droppableId

        // Add card to the dest list
        destList.cards.splice(destination.index, 0, moveCard)

        sourceList.cards.forEach((card, index) => {
          card.order = index
        })

        // Update the order of the card
        destList.cards.forEach((card, index) => {
          card.order = index
        })

        setOrderedData(newOrderedData)
      }
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId="lists"
        type="list"
        direction="horizontal"
      >
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderedData.map((list, index) => {
              return (
                <ListItem
                  key={list.id}
                  index={index}
                  data={list}
                />
              )
            })}
            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  )
}
