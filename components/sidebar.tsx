'use client'

import { notes } from '~/server/database/schema'
import CreateNoteButton from './create-note'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Button, Skeleton } from '@nextui-org/react'
import AuthButton from './ui/buttons/auth-button'
import { useState } from 'react'
import { StickyNote } from 'lucide-react'

async function getUserNotes() {
	const { data } = await axios.get('/api/notes')

	return data as (typeof notes.$inferSelect)[]
}

const useSidebar = () => {
	const [selectedNote, setSelectedNote] = useState<typeof notes.$inferSelect>()

	const { data, isLoading } = useQuery({
		queryKey: ['notes'],
		queryFn: getUserNotes,
	})

	const sidebar = (
		<div className='border-default-50 border-r-3 min-h-screen min-w-[250px] flex flex-col justify-between'>
			<div>
				<div className='px-3 border-default-50 border-b-3 flex items-center justify-between'>
					<h2 className='py-3 font-black text-2xl'>Note Flow</h2>
					<AuthButton />
				</div>

				<div className='flex flex-col-reverse gap-2 p-3'>
					{/* SKELETON */}
					{isLoading && (
						<>
							<Skeleton className='rounded-lg'>
								<div className='h-8 rounded-lg bg-secondary'></div>
							</Skeleton>
							<Skeleton className='rounded-lg'>
								<div className='h-8 rounded-lg bg-secondary'></div>
							</Skeleton>
						</>
					)}

					{/* NOTES */}
					{data?.map((note) => (
						<Button
							key={note.id}
							onClick={() => setSelectedNote(note)}
							size='sm'
							startContent={<StickyNote size={16} strokeWidth={2} />}
							className='text-left justify-start'
						>
							{note.title}
						</Button>
					))}
				</div>
			</div>

			<div className='p-3'>
				<CreateNoteButton />
			</div>
		</div>
	)

	return { sidebar, selectedNote, setSelectedNote }
}

export default useSidebar
