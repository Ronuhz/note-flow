'use client'

import { notes } from '~/server/database/schema'
import CreateNoteButton from './create-note'
import NoteItem from './note-item'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Skeleton } from '@nextui-org/react'
import LogOutButton from './ui/buttons/auth-button'

async function getUserNotes() {
	const { data } = await axios.get('/api/notes')

	return data as (typeof notes.$inferSelect)[]
}

const Sidebar = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['notes'],
		queryFn: getUserNotes,
	})

	return (
		<div className='border-default-50 border-r-3 min-h-screen w-[20%] max-w-[300px] flex flex-col justify-between'>
			<div>
				<div className='px-3 border-default-50 border-b-3 flex items-center justify-between'>
					<h2 className='py-3 font-black text-2xl'>Note Flow</h2>
					<LogOutButton />
				</div>

				<div className='flex flex-col gap-2 p-3'>
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
					{data?.map((note) => (
						<NoteItem key={note.id} title={note?.title} />
					))}
				</div>
			</div>

			<div className='p-3'>
				<CreateNoteButton />
			</div>
		</div>
	)
}

export default Sidebar
