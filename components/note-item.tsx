'use client'

import { Button } from '@nextui-org/react'
import { StickyNote } from 'lucide-react'

function NoteItem() {
	return (
		<Button
			size='sm'
			startContent={<StickyNote size={16} strokeWidth={2} />}
			className='text-left justify-start'
		>
			Note 1
		</Button>
	)
}

export default NoteItem
