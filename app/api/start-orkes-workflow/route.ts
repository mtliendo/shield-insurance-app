import { NextResponse } from 'next/server'

const token = process.env.ORKES_JWT || 'jwt'
const workflowName = process.env.ORKES_WORKFLOW_NAME || 'Marvel_Insurance_Demo'

export async function POST(req: Request) {
	try {
		const body = await req.json()
		const messages = body.messages || []
		console.log('the messages are', messages)

		const res = await fetch(
			`https://developer.orkescloud.com/api/workflow/${workflowName}`,
			{
				method: 'POST',
				headers: {
					'X-Authorization': token,
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
				body: JSON.stringify({
					input: {
						messages: messages,
					},
				}),
			}
		)

		const workflowId = await res.text()

		if (!res.ok) {
			console.error('Failed to start Orkes workflow:', workflowId)
			return NextResponse.json(
				{ error: 'Failed to start workflow', details: workflowId },
				{ status: res.status }
			)
		}

		return NextResponse.json({ workflowId })
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error)
		console.error('Error in start-orkes-workflow:', errorMessage)
		return NextResponse.json(
			{ error: 'Internal Server Error', details: errorMessage },
			{ status: 500 }
		)
	}
}
