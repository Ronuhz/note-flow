import { and, eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '~/server/database'
import { notes } from '~/server/database/schema'
import { getDatabaseUser } from '~/server/database/utils'

type POST_BODY = {
	title: string
}

type deleteProps = {
	id: string
}

export async function DELETE(request: NextRequest) {
	const dbUser = await getDatabaseUser()
	if (!dbUser)
		return NextResponse.json(
			{
				error: 'User was not found in the database.',
			},
			{ status: 404 }
		)

	const searchParams = request.nextUrl.searchParams
	const id = parseInt(searchParams.get('id') ?? '')
	if (id === 0)
		return NextResponse.json(
			{
				error: 'A note id must be given as a search parameter.',
			},
			{ status: 404 }
		)

	const deletedNote = await db
		.delete(notes)
		.where(and(eq(notes.id, id), eq(notes.userId, dbUser.id)))
		.returning()

	if (deletedNote.length > 0)
		return NextResponse.json(
			{ message: 'Note deleted successfully.' },
			{ status: 201 }
		)
	else
		return NextResponse.json(
			{
				error: 'Note with this id was not found in the database.',
			},
			{ status: 500 }
		)
}

export async function POST(request: NextRequest) {
	const body: POST_BODY = await request.json()
	const dbUser = await getDatabaseUser()

	if (!dbUser)
		return NextResponse.json(
			{
				error: 'User was not found in the database.',
			},
			{ status: 404 }
		)

	try {
		await db.insert(notes).values({ title: body.title, userId: dbUser?.id })

		return NextResponse.json(
			{ message: 'Note created successfully.' },
			{ status: 201 }
		)
	} catch (error) {
		return NextResponse.json(
			{
				error: 'Failed to create note in database.',
			},
			{ status: 500 }
		)
	}
}

export async function GET(request: NextRequest) {
	const dbUser = await getDatabaseUser()

	if (!dbUser)
		return NextResponse.json(
			{
				error: 'User was not found in the database.',
			},
			{ status: 404 }
		)

	try {
		const allNotes = await db.query.notes.findMany({
			where: (notes, { eq }) => eq(notes.userId, dbUser?.id),
		})

		return NextResponse.json(allNotes)
	} catch (error) {
		return NextResponse.json(
			{
				error: 'Failed to get all notes from database.',
			},
			{ status: 500 }
		)
	}
}
