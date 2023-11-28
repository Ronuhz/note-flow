'use client'

import { NextUIProvider } from '@nextui-org/react'

type props = {
	children: React.ReactNode
}

const Providers = ({ children }: props) => {
	return <NextUIProvider>{children}</NextUIProvider>
}

export default Providers
