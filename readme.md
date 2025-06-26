# Marvel Insurance Workshop

## passthrough function is used to kick off the workflow

this can be in an API route in nextjs. kicks off an orkes workflow after the user clicks the button.

```ts
const token = 'jwt'
const workflowName = 'Marvel_Insurance_Demo'

export const handler = async (event) => {
	const res = await fetch(
		`https://developer.orkescloud.com/api/workflow/${workflowName}`,
		{
			method: 'POST',
			headers: {
				'X-Authorization': token,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				input: {
					messages: [],
				},
			}),
		}
	)

	const workflowId = await res.text()
	const response = {
		statusCode: 200,
		body: workflowId,
	}
	return response
}
```

## orkes communicating to the frontend

```ts
export const handler = async (event) => {
	const systemMessage = event.body
	console.log('this is the system message', systemMessage)
	await fetch(
		`https://ytwoervl4zaanbga6gm76jliry.appsync-api.us-east-1.amazonaws.com/event`, //static appsync event api used for this workshop
		{
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				'x-api-key': 'da2-fqocz4yzybgdrfbsmoquvzuwue', //public api key used by all attendees
			},
			body: JSON.stringify({
				channel: 'mcu-workhop/focusotter'// replace with mcu-workshop/username
				events: [JSON.stringify(systemMessage)],
			}),
		}
	)
	const response = {
		statusCode: 200,
	}
	return response
}
```

## frontend calling calling orkes in the middle of a workflow

this can be a nextjs api route since it's just calling the webhook endpoint.

```ts
export const handler = async (event) => {
	const { userMessage, workflowId } = JSON.parse(event.body)

	const webhookId = 'km6j4e7d2aca-4180-11f0-bf16-aa4f6208411a'
	const taskRefName = 'conversation_response'
	const userInput = {
		message: {
			user: userMessage,
		},
	}
	await fetch(`https://developer.orkescloud.com/webhook/${webhookId}`, {
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
	})
	const response = {
		statusCode: 200,
		body: JSON.stringify('successfully sent'),
	}
	return response
}
```
