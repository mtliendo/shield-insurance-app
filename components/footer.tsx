import Link from "next/link"
import { Shield, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-red-500" />
              <span className="text-2xl font-bold">
                S.H.I.E.L.D. <span className="text-blue-400">Insurance</span>
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Protecting Earth's Mightiest Heroes and everyday citizens from the extraordinary challenges of living in
              the Marvel Universe.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
              <Linkedin className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/plans" className="text-gray-400 hover:text-white">
                  Insurance Plans
                </Link>
              </li>
              <li>
                <Link href="/get-coverage" className="text-gray-400 hover:text-white">
                  Get Coverage
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400">24/7 Hotline</span>
              </li>
              <li>
                <span className="text-red-400 font-semibold">1-800-SHIELD</span>
              </li>
              <li>
                <span className="text-gray-400">Emergency Claims</span>
              </li>
              <li>
                <span className="text-gray-400">Agent Support</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 S.H.I.E.L.D. Insurance. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  )
}
