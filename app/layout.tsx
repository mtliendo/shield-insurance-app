import type { Metadata } from 'next'
import './globals.css'
import ConfigureAmplifyClientSide from './configureAmplifyClientside'

export const metadata: Metadata = {
	title: 'v0 App',
	description: 'Created with v0',
	generator: 'v0.dev',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" type="image/svg+xml" href="/shield-logo.svg" />
			</head>
			<body>
				<ConfigureAmplifyClientSide />
				{children}
			</body>
		</html>
	)
}
