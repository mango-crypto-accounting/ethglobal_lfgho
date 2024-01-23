type Address = {
  email: string
  logo: string
  name: string
  address: string
  city: string
  zip: string
  state: string
  country: string
}

type Item = {
  description: string
  quantity: number
  price: number
  amount: number
}

type Currency = {
  value: string
  logo: string
}

type Crypto = {
  token: string
  chain: string
  walletAddress: string
}

type Fiat = {
  swift: string
  account: string
  routing: string
  bankEntity: string
}

export type TInvoice = {
  invoiceId: string
  number: string
  issueDate: string
  dueDate: string
  issuer: Address
  client: Address
  items: Item[]
  currency: Currency
  subtotal: number
  discount: number
  tax: number
  taxAmount: number
  total: number
  notes: string
  crypto: Crypto
  fiat: Fiat
  invoiceLink: string
}
