'use client'

import { Button } from '@nextui-org/react'
import { StickyNote } from 'lucide-react'

type props = { title: string | null }

function NoteItem({ title }: props) {
	return (
		<Button
			size='sm'
			startContent={<StickyNote size={16} strokeWidth={2} />}
			className='text-left justify-start'
		>
			{title ?? 'Note'}
		</Button>
	)
}

export default NoteItem
