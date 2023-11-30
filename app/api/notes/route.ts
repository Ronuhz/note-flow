import { NextRequest, NextResponse } from 'next/server'
import { db } from '~/server/database'
import { notes } from '~/server/database/schema'
import { getDatabaseUser } from '~/server/database/utils'

type POST_BODY = {
	title: string
}

const markdownContent = `
# Comprehensive Markdown Test

## Headings

### Subheading

#### Sub-subheading

## Text Formatting

This text will demonstrate *italics*, **bold**, and ***both***.

## Lists

### Unordered List
- Item 1
- Item 2
  - Sub-item A
  - Sub-item B

### Ordered List
1. First item
2. Second item
   1. Sub-item I
   2. Sub-item II

## Links and Images

[Markdown Guide](https://www.markdownguide.org/) - For learning Markdown.

![Markdown Logo](https://markdown-here.com/img/icon256.png)

## Blockquotes

> This is a blockquote.
> - Anonymous

## Code

Inline \`code\` can be added using backticks.
\`\`\`javascript
function greet() {
  console.log("Hello, Markdown!");
}
greet();
\`\`\`

## Tables

| Name     | Age | Location     |
|----------|-----|--------------|
| John     | 25  | New York     |
| Emily    | 30  | Los Angeles  |
| Michael  | 28  | San Francisco|

## Horizontal Rule

---

## Miscellaneous

### Strikethrough
~~This text is strikethrough.~~

### Task List
- [x] Task 1
- [ ] Task 2
- [ ] Task 3

## Escaping Characters

To display a backtick \` in Markdown, use \`code\`.
`

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
		await db
			.insert(notes)
			.values({ title: body.title, userId: dbUser?.id, body: markdownContent })

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
