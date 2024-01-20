import Invoice, { TInvoice } from '@/components/Invoice'

async function getData(invoiceId: string) {
  const res = await fetch(
    `https://us-central1-crypt-account-362116.cloudfunctions.net/invoice-generator/invoices/${invoiceId}`,
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
  const data = (await getData(invoiceId)) as TInvoice
  console.log(data)
  return (
    <div className="h-full">
      <Invoice invoice={data} />
    </div>
  )
}
