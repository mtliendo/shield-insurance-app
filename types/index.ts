export interface InsurancePlan {
  id: string
  title: string
  description: string
  price: string
  features: string[]
  icon: string
}

export interface Testimonial {
  id: string
  name: string
  location: string
  message: string
  avatar: string
}

export interface FAQ {
  question: string
  answer: string
}
