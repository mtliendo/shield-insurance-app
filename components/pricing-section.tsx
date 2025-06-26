"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { insurancePlans, iconComponents } from "@/data/insurance-plans"

export default function PricingSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("pricing-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="pricing-section" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Insurance Plans For The <span className="text-red-600">Super</span> World
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the coverage level that's right for you, from basic protection against minor superhero incidents to
            full coverage for intergalactic threats.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {insurancePlans.map((plan, index) => {
            const IconComponent = iconComponents[plan.icon as keyof typeof iconComponents]
            const isPopular = index === 1

            return (
              <Card
                key={plan.id}
                className={`relative transition-all duration-700 hover:scale-105 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                } ${isPopular ? "border-blue-500 border-2 shadow-xl" : "border-gray-200"}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                      index === 0 ? "bg-red-100" : index === 1 ? "bg-blue-100" : "bg-yellow-100"
                    }`}
                  >
                    <IconComponent
                      className={`h-8 w-8 ${
                        index === 0 ? "text-red-600" : index === 1 ? "text-blue-600" : "text-yellow-600"
                      }`}
                    />
                  </div>
                  <CardTitle className="text-xl font-bold">{plan.title}</CardTitle>
                  <CardDescription className="text-gray-600 mt-2">{plan.description}</CardDescription>
                  <div className="text-3xl font-bold text-gray-900 mt-4">{plan.price}</div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      isPopular ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-900 hover:bg-gray-800"
                    }`}
                  >
                    Get Protected →
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
