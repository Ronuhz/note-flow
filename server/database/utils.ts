import { getServerSession } from 'next-auth'
import { authOptions } from '../auth'
import { db } from '.'

export const getDatabaseUser = async () => {
	try {
		const currentUser = await getServerSession(authOptions)

		const dbUser = await db.query.users.findFirst({
			where: (users, { eq }) => eq(users.email, currentUser?.user?.email!),
		})

		return dbUser
	} catch (error) {
		return undefined
	}
}
