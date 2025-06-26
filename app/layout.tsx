import type { Metadata } from 'next'
import './globals.css'
import ConfigureAmplifyClientSide from './configureAmplifyClientside'

export const metadata: Metadata = {
	title: 'Orkes MCU Workshop',
	description: 'Orkes MCU Workshop',
	generator: 'Orkes',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="🛡️" />
			</head>
			<body>
				<ConfigureAmplifyClientSide />
				{children}
			</body>
		</html>
	)
}
