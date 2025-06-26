'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Shield, Clock } from 'lucide-react'
import Link from 'next/link'

// Pre-calculated particle positions and animations to prevent hydration mismatch
const PARTICLE_DATA = [
	{ left: 10, top: 20, delay: 0.5, duration: 3.2 },
	{ left: 85, top: 15, delay: 1.2, duration: 2.8 },
	{ left: 25, top: 80, delay: 0.8, duration: 3.5 },
	{ left: 70, top: 90, delay: 1.5, duration: 2.9 },
	{ left: 45, top: 35, delay: 0.3, duration: 3.1 },
	{ left: 90, top: 60, delay: 1.8, duration: 2.7 },
	{ left: 15, top: 70, delay: 0.7, duration: 3.3 },
	{ left: 80, top: 25, delay: 1.1, duration: 2.6 },
	{ left: 30, top: 50, delay: 0.9, duration: 3.0 },
	{ left: 65, top: 85, delay: 1.4, duration: 2.8 },
	{ left: 40, top: 10, delay: 0.6, duration: 3.4 },
	{ left: 95, top: 40, delay: 1.7, duration: 2.5 },
	{ left: 20, top: 95, delay: 0.4, duration: 3.6 },
	{ left: 75, top: 75, delay: 1.3, duration: 2.9 },
	{ left: 50, top: 65, delay: 0.2, duration: 3.7 },
	{ left: 35, top: 30, delay: 1.6, duration: 2.4 },
	{ left: 60, top: 45, delay: 0.1, duration: 3.8 },
	{ left: 25, top: 55, delay: 1.9, duration: 2.3 },
	{ left: 85, top: 35, delay: 0.8, duration: 3.9 },
	{ left: 15, top: 85, delay: 1.0, duration: 2.2 },
]

export default function HeroSection() {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		setIsVisible(true)
	}, [])

	return (
		<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
			{/* Background */}
			<div
				className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
				style={{
					backgroundImage:
						"linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)), url('https://images.pexels.com/photos/2694037/pexels-photo-2694037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			></div>

			{/* Animated particles */}
			<div className="absolute inset-0">
				{PARTICLE_DATA.map((particle, i) => (
					<div
						key={i}
						className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
						style={{
							left: `${particle.left}%`,
							top: `${particle.top}%`,
							animationDelay: `${particle.delay}s`,
							animationDuration: `${particle.duration}s`,
						}}
					/>
				))}
			</div>

			<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
				<div
					className={`transition-all duration-1000 ${
						isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
					}`}
				>
					<div className="flex items-center justify-center mb-6">
						<Shield className="h-12 w-12 text-red-500 mr-3" />
						<span className="text-2xl font-bold text-yellow-400 tracking-wider">
							S.H.I.E.L.D. INSURANCE
						</span>
					</div>

					<h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
						Insurance For A World Of{' '}
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-yellow-400">
							Superhero
						</span>{' '}
						Challenges
					</h1>

					<p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
						Protecting you against the unpredictable consequences of living in a
						universe where superheroes, aliens, and cosmic events are part of
						everyday life.
					</p>

					<div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
						<Button
							size="lg"
							className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg"
						>
							File a Claim Now →
						</Button>
						<Button
							variant="outline"
							size="lg"
							className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg"
							asChild
						>
							<Link href="/get-coverage">View Coverage Plans</Link>
						</Button>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
						<div className="flex items-center justify-center space-x-3 text-yellow-400">
							<Clock className="h-6 w-6" />
							<div>
								<div className="font-semibold">24/7 Protection</div>
								<div className="text-sm text-gray-300">
									Superhero incidents don't wait
								</div>
							</div>
						</div>
						<div className="flex items-center justify-center space-x-3 text-yellow-400">
							<Shield className="h-6 w-6" />
							<div>
								<div className="font-semibold">Trusted by 100,000+</div>
								<div className="text-sm text-gray-300">
									Clients across the multiverse
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
