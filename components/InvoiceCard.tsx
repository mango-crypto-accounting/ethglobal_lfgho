'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { useForm } from 'react-hook-form'
import { useAccount } from 'wagmi'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { TInvoice } from './Invoice'
import { InvoiceButton } from './InvoiceButton'
import InvoiceDetails from './InvoiceDetails'
import Web3Connect from './Web3Connect'

type CardProps = React.ComponentProps<typeof Card> & {
  toggleState?: () => void
  isFirstState?: boolean
  invoice: TInvoice
}

const tokens = [
  {
    value: 'ETH',
    label: 'Ethereum',
    logo: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1696501628',
  },
  {
    value: 'USDT',
    label: 'Tether',
    logo: 'https://assets.coingecko.com/coins/images/325/small/Tether.png?1696501661',
  },
  {
    value: 'BNB',
    label: 'BNB',
    logo: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png?1696501970',
  },
  {
    value: 'USDC',
    label: 'USD Coin',
    logo: 'https://assets.coingecko.com/coins/images/6319/small/usdc.png?1696506694',
  },
  {
    value: 'STETH',
    label: 'Lido Staked Ether',
    logo: 'https://assets.coingecko.com/coins/images/13442/small/steth_logo.png?1696513206',
  },
  {
    value: 'GHO',
    label: 'GHO',
    logo: 'https://assets.coingecko.com/coins/images/30663/small/ghoaave.jpeg?1696529533',
  },
] as const

const FormSchema = z.object({
  paymentMethod: z.string({
    required_error: 'Please select a payment method.',
  }),
})

function formatToLocalCurrency(
  amount: number,
  locale: string,
  currency: string,
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

export default function InvoiceCard({
  className,
  toggleState,
  isFirstState,
  invoice,
  ...props
}: CardProps) {
  const { address } = useAccount()
  const [open, setOpen] = useState(false)
  const [triggerWidth, setTriggerWidth] = useState(0)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }
  return (
    <div className="flex flex-col justify-end gap-4">
      <Web3Connect />

      <Card className={className} {...props}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <CardHeader>
              <CardTitle>
                <div className="flex justify-between">
                  <span>Invoice #{invoice.number}</span>
                  <span>
                    {formatToLocalCurrency(invoice.total, 'en-US', 'USD')}
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid">
              <InvoiceDetails invoice={invoice} />
              {address && (
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  defaultValue="GHO"
                  render={({ field }) => (
                    <FormItem className="mb-6 flex w-full flex-col">
                      <FormLabel>Payment method</FormLabel>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                'w-full justify-between',
                                !field.value && 'text-muted-foreground',
                              )}
                              ref={(node) => {
                                if (node) setTriggerWidth(node.offsetWidth)
                              }}>
                              <div className="flex items-center gap-2">
                                <img
                                  alt={field.value}
                                  src={
                                    tokens.find(
                                      (token) => token.value === field.value,
                                    )?.logo
                                  }
                                  className="h-5 w-5 rounded-full"
                                />
                                {field.value
                                  ? tokens.find(
                                      (token) => token.value === field.value,
                                    )?.label
                                  : 'Select a token'}
                              </div>
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>

                        <PopoverContent
                          className="max-w-full p-0"
                          style={{
                            width: triggerWidth,
                          }}>
                          <Command>
                            <CommandInput
                              placeholder="Search tokens..."
                              className="h-9"
                            />
                            <CommandEmpty>No token found.</CommandEmpty>
                            <CommandGroup>
                              {tokens.map((token) => (
                                <CommandItem
                                  value={token.label}
                                  key={token.value}
                                  onSelect={() => {
                                    form.setValue('paymentMethod', token.value)
                                    setOpen(false)
                                  }}>
                                  <div className="flex items-center gap-2">
                                    <img
                                      alt={token.label}
                                      src={token.logo}
                                      className="h-5 w-5 rounded-full"
                                    />
                                    {token.label}
                                  </div>
                                  <CheckIcon
                                    className={cn(
                                      'ml-auto h-4 w-4',
                                      token.value === field.value
                                        ? 'opacity-100'
                                        : 'opacity-0',
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <InvoiceButton />
            </CardContent>
          </form>
        </Form>
      </Card>
    </div>
  )
}
