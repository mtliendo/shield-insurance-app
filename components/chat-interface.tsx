'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Loader2 } from 'lucide-react'

interface Message {
	source: 'user' | 'agent'
	text: string
}

interface ChatInterfaceProps {
	messages: Message[]
	onSendMessage: (message: string) => void
	isWaitingForAgent?: boolean
}

export default function ChatInterface({
	messages,
	onSendMessage,
	isWaitingForAgent,
}: ChatInterfaceProps) {
	const [inputMessage, setInputMessage] = useState('')
	const messagesContainerRef = useRef<HTMLDivElement>(null)

	// Auto scroll to bottom when messages change
	useEffect(() => {
		if (messagesContainerRef.current) {
			const container = messagesContainerRef.current
			container.scrollTo({
				top: container.scrollHeight,
				behavior: 'smooth',
			})
		}
	}, [messages])

	const handleSendMessage = async () => {
		if (!inputMessage.trim()) return
		onSendMessage(inputMessage)
		setInputMessage('')
	}

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			handleSendMessage()
		}
	}

	return (
		<div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden h-full">
			{/* Chat Header */}
			<div className="bg-blue-600 text-white p-4 flex items-center">
				<div className="w-10 h-10 rounded-full overflow-hidden mr-3">
					<img
						src="/professional-agent-avatar.png"
						alt="Agent Coulson"
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="flex-1">
					<h3 className="font-semibold">Agent Coulson</h3>
					<p className="text-xs text-blue-100">Online</p>
				</div>
			</div>

			{/* Chat Messages */}
			<div
				ref={messagesContainerRef}
				className="flex-1 overflow-y-auto p-4 bg-gray-50"
			>
				<AnimatePresence>
					{messages.map((message, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
							className={`flex mb-4 ${
								message.source === 'user' ? 'justify-end' : 'justify-start'
							}`}
						>
							{message.source === 'agent' && (
								<div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
									<img
										src="/agent-avatar-small.png"
										alt="Agent"
										className="w-full h-full object-cover"
									/>
								</div>
							)}

							<div
								className={`max-w-[80%] p-3 rounded-lg ${
									message.source === 'user'
										? 'bg-blue-600 text-white rounded-tr-none'
										: 'bg-white shadow-sm rounded-tl-none'
								}`}
							>
								<p>{message.text}</p>
							</div>
						</motion.div>
					))}
				</AnimatePresence>

				{/* Agent Typing Indicator */}
				{isWaitingForAgent && (
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						className="flex justify-start mb-4"
					>
						<div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
							<img
								src="/agent-avatar-small.png"
								alt="Agent"
								className="w-full h-full object-cover"
							/>
						</div>
						<div className="bg-white shadow-sm rounded-lg rounded-tl-none p-3">
							<div className="flex space-x-1">
								<div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
								<div
									className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
									style={{ animationDelay: '0.1s' }}
								></div>
								<div
									className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
									style={{ animationDelay: '0.2s' }}
								></div>
							</div>
						</div>
					</motion.div>
				)}
			</div>

			{/* Input Area */}
			<div className="border-t border-gray-200 p-3 bg-white">
				<div className="flex items-center">
					<div className="flex-1 relative">
						<textarea
							value={inputMessage}
							onChange={(e) => setInputMessage(e.target.value)}
							onKeyDown={handleKeyPress}
							placeholder="Type your message here..."
							className="w-full py-2 px-4 pr-10 border border-gray-300 rounded-full resize-none min-h-[40px] max-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							rows={1}
						/>

						<button
							onClick={handleSendMessage}
							disabled={isWaitingForAgent}
							className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-colors bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400"
						>
							{isWaitingForAgent ? (
								<Loader2 size={16} className="animate-spin" />
							) : (
								<Send size={16} />
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
