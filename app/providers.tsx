'use client'

import { NextUIProvider } from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'

type props = {
	children: React.ReactNode
}

const queryClient = new QueryClient()

const Providers = ({ children }: props) => {
	return (
		<QueryClientProvider client={queryClient}>
			<SessionProvider>
				<NextUIProvider>{children}</NextUIProvider>
			</SessionProvider>
		</QueryClientProvider>
	)
}

export default Providers
