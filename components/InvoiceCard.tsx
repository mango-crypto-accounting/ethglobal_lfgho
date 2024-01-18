'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'
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
import { InvoiceButton } from './InvoiceButton'
import InvoiceDetails from './InvoiceDetails'
import Web3Connect from './Web3Connect'

const invoiceStateOne = {
  x: 0,
  opacity: 0.5,
}

const invoiceStateTwo = {
  x: -150,
  opacity: 1,
}

type CardProps = React.ComponentProps<typeof Card> & {
  toggleState: () => void
  isFirstState: boolean
}

const tokens = [
  { label: 'USDC', value: 'usdc' },
  { label: 'GHO', value: 'gho' },
  { label: 'ETH', value: 'eth' },
] as const

const FormSchema = z.object({
  paymentMethod: z.string({
    required_error: 'Please select a payment method.',
  }),
})

export default function InvoiceCard({
  className,
  toggleState,
  isFirstState,
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
    <div className="flex w-[500px] flex-col gap-4 p-6">
      <Web3Connect />
      <div className="relative">
        <div className="">
          <Card className={className} {...props}>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6">
                <CardHeader>
                  <CardTitle>
                    <div className="flex justify-between">
                      <span>Invoice #146</span>
                      <span>$5,000.00</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid">
                  <InvoiceDetails />
                  {address && (
                    <FormField
                      control={form.control}
                      name="paymentMethod"
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
                                  {field.value
                                    ? tokens.find(
                                        (token) => token.value === field.value,
                                      )?.label
                                    : 'Select a token'}
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
                                        form.setValue(
                                          'paymentMethod',
                                          token.value,
                                        )
                                        setOpen(false)
                                      }}>
                                      {token.label}
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
        <div className="absolute left-[100%] top-0 align-middle">
          <div className="relative left-[450px]">
            <motion.div
              animate={isFirstState ? invoiceStateOne : invoiceStateTwo}
              transition={{ type: 'tween', duration: 0.3 }}
              className="h-fit w-[700px] rounded-md border bg-gray-100 p-6 drop-shadow-md hover:cursor-pointer hover:border-blue-500"
              onClick={toggleState}>
              <h1>Invoice here</h1>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
