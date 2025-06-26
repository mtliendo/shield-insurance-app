'use client'

import { useState, useEffect, useRef } from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import ChatInterface from '@/components/chat-interface'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield } from 'lucide-react'

import type { EventsChannel } from 'aws-amplify/data'
import { events } from 'aws-amplify/data'
import ConfigureAmplifyClientSide from '../configureAmplifyClientside'

// Define types for chat messages and API responses to avoid using 'any'
interface Message {
	source: 'user' | 'agent'
	text: string
}

interface WebSocketResponse {
	id: string
	type: string
	event: string
}

const coverageOptions = [
	{
		number: '1',
		title: 'Property Protection',
		description: 'Coverage for damage from super-powered incidents',
	},
	{
		number: '2',
		title: 'Personal Safety',
		description: 'Protection for enhanced individuals and their families',
	},
	{
		number: '3',
		title: 'Business Coverage',
		description: 'Specialized plans for businesses in high-risk areas',
	},
	{
		number: '4',
		title: 'Special Events',
		description: 'Coverage for gatherings and public events',
	},
]

export default function GetCoveragePage() {
	const [showChat, setShowChat] = useState(false)
	const [messages, setMessages] = useState<Message[]>([])
	const [workflowId, setWorkflowId] = useState<string | null>(null)
	const [isWaitingForAgent, setIsWaitingForAgent] = useState(false)
	const sub = useRef<any>(null) // Using any to avoid complex subscription types for now

	const initializeWorkflow = async () => {
		setIsWaitingForAgent(true)
		try {
			const response = await fetch('/api/start-orkes-workflow', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				// You can pass initial messages if needed
				body: JSON.stringify({ messages: [] }),
			})

			if (!response.ok) {
				throw new Error('Failed to start workflow')
			}

			const { workflowId: newWorkflowId } = await response.json()
			setWorkflowId(newWorkflowId)
			return newWorkflowId
		} catch (error) {
			console.error('Failed to initialize workflow:', error)
			setMessages((prev) => [
				...prev,
				{
					source: 'agent',
					text: 'Sorry, I was unable to connect with the S.H.I.E.L.D. network. Please try again in a moment.',
				},
			])
			return null
		} finally {
			setIsWaitingForAgent(false)
		}
	}

	const handleStartChat = () => {
		setShowChat(true)
		setMessages([
			{
				source: 'agent',
				text: "You've been successfully connected to Agent Coulson, your dedicated S.H.I.E.L.D. insurance specialist. I'll help you find the perfect coverage bundle for your unique situation. Just a moment while I review our available protection plans.",
			},
		])
		initializeWorkflow()
	}

	const handleSendMessage = async (userMessage: string) => {
		if (!workflowId) {
			console.error('Cannot send message, workflowId is not set.')
			return
		}

		// Optimistically add user message to the chat
		setMessages((prev) => [...prev, { source: 'user', text: userMessage }])
		setIsWaitingForAgent(true)

		try {
			await fetch('/api/continue-orkes-conversation', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ userMessage, workflowId }),
			})
		} catch (error) {
			console.error('Failed to send message:', error)
			// Optionally, show an error message in the chat
			setMessages((prev) => [
				...prev,
				{
					source: 'agent',
					text: "I'm having trouble sending your message. Please try again.",
				},
			])
			setIsWaitingForAgent(false)
		}
	}

	useEffect(() => {
		let channel: EventsChannel

		const connectAndSubscribe = async () => {
			if (!process.env.NEXT_PUBLIC_USERNAME) {
				console.error('NEXT_PUBLIC_USERNAME is not set.')
				return
			}
			channel = await events.connect(
				`mcu-workshop/${process.env.NEXT_PUBLIC_USERNAME}`
			)
			console.log('the channel is', channel)

			if (!sub.current) {
				sub.current = channel.subscribe({
					next: (data: WebSocketResponse) => {
						console.log('received', data)
						if (data && data.event) {
							setIsWaitingForAgent(false)
							setMessages((prev) => [
								...prev,
								{ source: 'agent', text: data.event },
							])
						}
					},
					error: (err) => console.error('error', err),
				})
			}
		}

		if (showChat) {
			connectAndSubscribe()
		}

		return () => {
			sub.current?.unsubscribe()
			sub.current = null
			if (channel) {
				channel.close()
			}
		}
	}, [showChat])

	return (
		<div className="min-h-screen bg-gray-50">
			<Navbar />

			<div className="pt-20 pb-12">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12">
						<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
							Get Your Personalized Shield Bundle
						</h1>
						<p className="text-xl text-gray-600 max-w-4xl mx-auto">
							Connect with a S.H.I.E.L.D. insurance specialist to create your
							custom protection plan. Whether you need coverage for your home,
							business, or personal safety, we'll help you find the perfect
							bundle for your unique situation in the Marvel Universe.
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* Main Content */}
						<div className="lg:col-span-2">
							{!showChat ? (
								<Card className="mb-8">
									<CardContent className="p-12 text-center">
										<div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
											<Shield className="h-12 w-12 text-red-600" />
										</div>
										<h2 className="text-2xl font-bold text-gray-900 mb-4">
											Ready to Find Your Perfect Coverage?
										</h2>
										<p className="text-gray-600 mb-8 max-w-md mx-auto">
											Click below to connect with a S.H.I.E.L.D. insurance
											specialist who will help you build a custom protection
											plan tailored to your needs.
										</p>
										<Button
											onClick={handleStartChat}
											size="lg"
											className="bg-red-600 hover:bg-red-700"
										>
											<Shield className="h-5 w-5 mr-2" />
											Start Consultation
										</Button>
									</CardContent>
								</Card>
							) : (
								<div className="flex justify-center items-start">
									<div className="w-full max-w-xl h-[600px]">
										<ChatInterface
											messages={messages}
											onSendMessage={handleSendMessage}
											isWaitingForAgent={isWaitingForAgent}
										/>
									</div>
								</div>
							)}
						</div>

						{/* Sidebar */}
						<div className="space-y-6">
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center text-red-600">
										<Shield className="h-5 w-5 mr-2" />
										Coverage Options
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									{coverageOptions.map((option) => (
										<div
											key={option.number}
											className="flex items-start space-x-3"
										>
											<div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
												<span className="text-red-600 font-semibold text-sm">
													{option.number}
												</span>
											</div>
											<div>
												<div className="font-semibold text-gray-900">
													{option.title}
												</div>
												<div className="text-sm text-gray-600">
													{option.description}
												</div>
											</div>
										</div>
									))}
								</CardContent>
							</Card>

							<Card className="bg-gray-900 text-white">
								<CardHeader>
									<CardTitle className="flex items-center text-red-400">
										<Shield className="h-5 w-5 mr-2" />
										Need Immediate Assistance?
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-gray-300 mb-4">
										For urgent inquiries about your coverage or to speak with a
										S.H.I.E.L.D. agent
									</p>
									<div className="text-2xl font-bold text-red-400 mb-2">
										1-800-SHIELD
									</div>
									<p className="text-sm text-gray-400">
										Available 24/7 for all your insurance needs
									</p>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	)
}
