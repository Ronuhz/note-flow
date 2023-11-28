import { NextRequest, NextResponse } from 'next/server'
import { db } from '~/server/database'
import { notes } from '~/server/database/schema'
import { getDatabaseUser } from '~/server/database/utils'

type POST_BODY = {
	title: string
}

export async function POST(request: NextRequest) {
	const body: POST_BODY = await request.json()
	const dbUser = await getDatabaseUser()

	if (!dbUser)
		return NextResponse.json(
			{
				error:
					'Failed to create note because your account is not in our database.',
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
				error:
					'Failed to get all the notes because your account is not in our database.',
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
