'use client'

import { Button, Spinner } from '@nextui-org/react'
import { useSession, signOut, signIn } from 'next-auth/react'
import React from 'react'

const AuthButton = () => {
	const { status } = useSession()

	switch (status) {
		case 'authenticated':
			return (
				<Button
					size='sm'
					color='danger'
					variant='flat'
					onClick={() => signOut()}
				>
					Log Out
				</Button>
			)

		case 'unauthenticated':
			return (
				<Button
					size='sm'
					color='primary'
					onClick={() => signIn('google', { callbackUrl: '/editor' })}
				>
					Log In
				</Button>
			)

		default:
			return (
				<Button size='sm' variant='flat' disabled>
					<Spinner size='sm' />
				</Button>
			)
	}
}

export default AuthButton
