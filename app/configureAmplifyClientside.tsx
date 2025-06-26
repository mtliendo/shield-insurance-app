'use client'

import { Amplify } from 'aws-amplify'

Amplify.configure(
	{
		API: {
			Events: {
				endpoint: process.env
					.NEXT_PUBLIC_APPSYNC_REALTIME_HTTP_ENDPOINT as string,
				region: process.env.NEXT_PUBLIC_APPSYNC_REGION as string,
				defaultAuthMode: 'apiKey',
				apiKey: process.env.NEXT_PUBLIC_APPSYNC_PUBLIC_API_KEY as string,
			},
		},
	},
	{ ssr: true }
)

export default function ConfigureAmplifyClientSide() {
	return null
}
