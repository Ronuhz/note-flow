import { getDatabaseUser } from '~/server/database/utils'

export default async function Home() {
	const dbUser = await getDatabaseUser()

	return (
		<main className='min-h-screen'>
			<h1>{dbUser?.name}</h1>
		</main>
	)
}
