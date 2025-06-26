import Navbar from '@/components/navbar'
import HeroSection from '@/components/hero-section'
import PricingSection from '@/components/pricing-section'
import TestimonialsSection from '@/components/testimonials-section'
import FAQSection from '@/components/faq-section'
import Footer from '@/components/footer'

export default function HomePage() {
	return (
		<div className="min-h-screen">
			<Navbar />
			<HeroSection />
			<PricingSection />
			<TestimonialsSection />
			<FAQSection />
			<Footer />
		</div>
	)
}
