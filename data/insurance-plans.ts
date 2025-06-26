import type { InsurancePlan } from "../types"
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Home,
  Car,
  Building,
  Zap,
  Brain,
  Clock,
  Sparkles,
  Rocket,
  Users,
  Scale,
  Heart,
} from "lucide-react"

export const insurancePlans: InsurancePlan[] = [
  {
    id: "temporal-displacement",
    title: "Temporal Displacement Coverage",
    description:
      "For individuals who have been snapped, time-jumped, looped, or erased from the timeline and brought back.",
    price: "$79.99/month",
    features: [
      "Timeline restoration assistance",
      "Memory reconstruction therapy",
      "Identity verification support",
      "Lost time compensation",
      "Quantum realm extraction coverage",
    ],
    icon: "Clock",
  },
  {
    id: "mutation-onset",
    title: "Mutation Onset Support Plan",
    description:
      "Covers physical, psychological, and lifestyle changes resulting from spontaneous mutation, super-serum reactions, gamma exposure, or X-gene activation.",
    price: "$149.99/month",
    features: [
      "Medical monitoring and treatment",
      "Power control training",
      "Psychological counseling",
      "Lifestyle adaptation support",
      "Specialized equipment coverage",
    ],
    icon: "Zap",
  },
  {
    id: "avenger-property",
    title: "Avenger-Level Property Protection",
    description:
      "Covers property damage caused by battles involving enhanced individuals, alien invasions, or government-sanctioned teams.",
    price: "$249.99/month",
    features: [
      "Unlimited property damage coverage",
      "Emergency relocation assistance",
      "Structural integrity assessment",
      "Rapid reconstruction services",
      "24/7 battle zone evacuation",
    ],
    icon: "ShieldAlert",
  },
]

export const specialCoverages = [
  {
    id: "mystic-mishap",
    title: "Mystic Mishap Protection",
    description:
      "Covers damages and injuries related to magical interference, spells gone wrong, mirror dimension accidents, or being temporarily turned into a goat.",
    price: "$199.99/month",
    icon: "Sparkles",
  },
  {
    id: "intergalactic-invasion",
    title: "Intergalactic Invasion Insurance",
    description: "Covers fallout from alien attacks, abductions, or technology crashes from extraterrestrial entities.",
    price: "$179.99/month",
    icon: "Rocket",
  },
  {
    id: "shapeshifter-identity",
    title: "Shapeshifter Identity Defense",
    description: "Covers impersonation by Skrulls, variants, clones, or malfunctioning AI doubles.",
    price: "$59.99/month",
    icon: "Users",
  },
  {
    id: "heroic-liability",
    title: "Heroic Liability Plan",
    description:
      "Protects heroes and vigilantes from lawsuits due to unintended civilian harm, property damage, or city ordinance violations.",
    price: "$299.99/month",
    icon: "Scale",
  },
  {
    id: "mind-control-recovery",
    title: "Mind Control Recovery Rider",
    description: "Covers the emotional and reputational fallout from being brainwashed, hexed, or puppeteered.",
    price: "$129.99/month",
    icon: "Heart",
  },
]

export const iconComponents = {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Home,
  Car,
  Building,
  Clock,
  Zap,
  Sparkles,
  Rocket,
  Users,
  Scale,
  Heart,
  Brain,
}
