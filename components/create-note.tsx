'use client'

import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@nextui-org/react'
import axios from 'axios'
import { ChangeEvent, useState } from 'react'

const CreateNoteButton = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const [title, setTitle] = useState('')

	function onOpenButtonClicked() {
		setTitle('')
		onOpen()
	}

	function onTitleInputChange(event: ChangeEvent<HTMLInputElement>) {
		const { value } = event.target
		setTitle(value)
	}

	async function onNewNoteSubmit() {
		if (title.length === 0) return

		await axios.post('/api/notes', { title })
	}

	return (
		<>
			<Button size='sm' fullWidth color='primary' onPress={onOpenButtonClicked}>
				Add New Note
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
				<ModalContent>
					{(onClose) => {
						return (
							<>
								<ModalHeader className='flex flex-col gap-1'>
									Create New Note
								</ModalHeader>
								<ModalBody>
									<Input
										autoFocus
										value={title}
										onChange={onTitleInputChange}
										label='Title'
										placeholder='Enter the title'
										variant='bordered'
									/>
								</ModalBody>
								<ModalFooter>
									<Button color='danger' variant='flat' onPress={onClose}>
										Cancel
									</Button>
									<Button
										color='primary'
										onPress={() => {
											onNewNoteSubmit()
											onClose()
										}}
									>
										Create
									</Button>
								</ModalFooter>
							</>
						)
					}}
				</ModalContent>
			</Modal>
		</>
	)
}

export default CreateNoteButton
