import dynamic from 'next/dynamic'

export const revalidate = 1800 // revalidate at most every half hour

const AnimatedInvoiceSSR = dynamic(
  () => import('@/components/AnimatedInvoice'),
  {
    ssr: false,
  },
)

export default function Home() {
  return (
    <div className="h-full">
      <AnimatedInvoiceSSR />
    </div>
  )
}
