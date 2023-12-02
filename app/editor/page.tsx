'use client'

import { Button, ButtonGroup, Tab, Tabs, Textarea } from '@nextui-org/react'
import {
	Bold,
	Code,
	Heading1,
	Heading2,
	Heading3,
	Heading4,
	Image,
	Italic,
	Link,
	Strikethrough,
} from 'lucide-react'
import { useRef } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import useSidebar from '~/components/sidebar'

const Editor = () => {
	const { sidebar, selectedNote, setSelectedNote } = useSidebar()
	const textareaRef = useRef<HTMLTextAreaElement | null>(null)

	const handleInsertMarkdownElement = (element: string) => {
		if (textareaRef.current) {
			const { selectionStart, selectionEnd, value } = textareaRef.current
			const before = value.substring(0, selectionStart || 0)
			const selectedText = value.substring(
				selectionStart || 0,
				selectionEnd || 0
			)

			const after = value.substring(selectionEnd || 0)

			setSelectedNote((prev) => {
				if (!prev) return
				return { ...prev, body: `${before}${element}${selectedText}${after}` }
			})
		}
	}

	const handleSurroundSelection = (formatSymbol: string) => {
		if (textareaRef.current) {
			const { selectionStart, selectionEnd, value } = textareaRef.current
			const before = value.substring(0, selectionStart || 0)
			const selectedText = value.substring(
				selectionStart || 0,
				selectionEnd || 0
			)
			if (selectedText.length === 0) return

			const after = value.substring(selectionEnd || 0)

			if (before.endsWith(formatSymbol) && after.startsWith(formatSymbol)) {
				setSelectedNote((prev) => {
					if (!prev) return
					return {
						...prev,
						body: `${before.slice(
							0,
							-formatSymbol.length
						)}${selectedText}${after.slice(formatSymbol.length)}`,
					}
				})
			} else {
				setSelectedNote((prev) => {
					if (!prev) return
					return {
						...prev,
						body: `${before}${formatSymbol}${selectedText}${formatSymbol}${after}`,
					}
				})
			}
		}
	}

	return (
		<main className='flex h-screen'>
			{sidebar}

			{selectedNote && (
				<div className='p-5 flex flex-col overflow-auto gap-3 w-full items-start'>
					<h1 className='text-3xl font-bold'>{selectedNote?.title}</h1>

					<div className='flex w-full flex-col'>
						<Tabs aria-label='Options'>
							<Tab key='editor' title='Editor'>
								<div className='flex flex-col gap-3 items-start'>
									{/* STYLE BUTTONS */}
									<ButtonGroup>
										<Button
											isIconOnly
											variant='flat'
											onClick={() => handleInsertMarkdownElement('# ')}
										>
											<Heading1 />
										</Button>
										<Button
											isIconOnly
											variant='flat'
											onClick={() => handleInsertMarkdownElement('## ')}
										>
											<Heading2 />
										</Button>
										<Button
											isIconOnly
											variant='flat'
											onClick={() => handleInsertMarkdownElement('### ')}
										>
											<Heading3 />
										</Button>
										<Button
											isIconOnly
											variant='flat'
											onClick={() => handleInsertMarkdownElement('#### ')}
										>
											<Heading4 />
										</Button>
										<Button
											isIconOnly
											variant='flat'
											onClick={() => handleSurroundSelection('**')}
										>
											<Bold />
										</Button>
										<Button
											isIconOnly
											variant='flat'
											onClick={() => handleSurroundSelection('*')}
										>
											<Italic />
										</Button>
										<Button
											isIconOnly
											variant='flat'
											onClick={() => handleSurroundSelection('~')}
										>
											<Strikethrough />
										</Button>
										<Button
											isIconOnly
											variant='flat'
											onClick={() => handleSurroundSelection('\n```\n')}
										>
											<Code />
										</Button>
										<Button
											isIconOnly
											variant='flat'
											onClick={() =>
												handleInsertMarkdownElement(
													'[Markdown Guide](https://www.markdownguide.org/)'
												)
											}
										>
											<Link />
										</Button>
										<Button
											isIconOnly
											variant='flat'
											onClick={() =>
												handleInsertMarkdownElement(
													'![Markdown Logo](https://markdown-here.com/img/icon256.png)'
												)
											}
										>
											<Image />
										</Button>
									</ButtonGroup>

									<Textarea
										ref={textareaRef}
										disableAutosize
										fullWidth
										style={{ height: '70vh' }}
										value={selectedNote?.body ?? ''}
										onChange={(e) =>
											setSelectedNote((prev) => {
												if (!prev) return
												return { ...prev, body: e.target.value }
											})
										}
										placeholder='Write your note here...'
									/>
								</div>
							</Tab>
							<Tab key='preview' title='Preview'>
								<div className='w-full flex justify-center'>
									<Markdown
										remarkPlugins={[remarkGfm]}
										className='prose prose-invert  prose-pre:bg-neutral-900 prose-p:whitespace-break-spaces'
									>
										{selectedNote.body}
									</Markdown>
								</div>
							</Tab>
						</Tabs>
					</div>
				</div>
			)}
		</main>
	)
}
// 292524

export default Editor
