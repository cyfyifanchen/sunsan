import Stripe from 'stripe'

export const strip = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: '2023-10-16',
  typescript: true,
})
