import { NextRequest, NextResponse } from 'next/server'

const webhookId = process.env.ORKES_WEBHOOK_ID
const taskRefName = process.env.ORKES_TASK_REFERENCE_NAME

export async function POST(req: NextRequest) {
	try {
		const { userMessage, workflowId } = await req.json()

		if (!userMessage || !workflowId) {
			return NextResponse.json(
				{ error: 'Missing userMessage or workflowId' },
				{ status: 400 }
			)
		}

		if (!webhookId || !taskRefName) {
			console.error('Missing ORKES_WEBHOOK_ID or ORKES_TASK_REFERENCE_NAME')
			return NextResponse.json(
				{ error: 'Server configuration error' },
				{ status: 500 }
			)
		}

		const userInput = {
			message: {
				user: userMessage,
			},
		}

		const res = await fetch(
			`https://developer.orkescloud.com/webhook/${webhookId}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					mcu: 'hulkSmash',
				},
				body: JSON.stringify({
					event: {
						type: 'mcuTest',
						workflowId: workflowId,
						taskRefName: taskRefName,
					},
					user_response: userInput,
					status: 'COMPLETED',
				}),
			}
		)

		if (!res.ok) {
			const errorBody = await res.text()
			console.error('Failed to send message to Orkes:', errorBody)
			return NextResponse.json(
				{ error: 'Failed to continue conversation', details: errorBody },
				{ status: res.status }
			)
		}

		return NextResponse.json({ message: 'Successfully sent' })
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error)
		console.error('Error in continue-orkes-conversation:', errorMessage)
		return NextResponse.json(
			{ error: 'Internal Server Error', details: errorMessage },
			{ status: 500 }
		)
	}
}
