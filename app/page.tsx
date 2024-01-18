import dynamic from 'next/dynamic'

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
