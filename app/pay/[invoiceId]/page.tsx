import Invoice from '@/components/Invoice'

async function getData(invoiceId: string) {
  console.log(invoiceId)
  const res = await fetch(
    `https://us-central1-crypt-account-362116.cloudfunctions.net/invoice-generator/${invoiceId}`,
  )

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function PayInvoicePage({
  params,
}: {
  params: { invoiceId: string }
}) {
  const { invoiceId } = params
  const data = await getData(invoiceId)
  console.log(data)
  return (
    <div className="h-full">
      <Invoice />
    </div>
  )
}
