import CreateNoteButton from './create-note'
import NoteItem from './note-item'

const Sidebar = () => {
	return (
		<div className='border-default-50 border-r-3 min-h-screen w-[20%] flex flex-col justify-between'>
			<div>
				<div className='border-default-50 border-b-3'>
					<h2 className='p-3 font-black text-2xl'>Note Flow</h2>
				</div>

				<div className='flex flex-col gap-2 p-3'>
					<NoteItem />
					<NoteItem />
					<NoteItem />
					<NoteItem />
				</div>
			</div>

			<div className='p-3'>
				<CreateNoteButton />
			</div>
		</div>
	)
}

export default Sidebar
