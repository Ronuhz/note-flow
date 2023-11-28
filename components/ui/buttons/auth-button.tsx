'use client'

import { Button } from '@nextui-org/react'
import { useSession, signOut, signIn } from 'next-auth/react'
import React from 'react'

const LogOutButton = () => {
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

		default:
			return (
				<Button size='sm' color='primary' onClick={() => signIn('google')}>
					Log In
				</Button>
			)
	}
}

export default LogOutButton