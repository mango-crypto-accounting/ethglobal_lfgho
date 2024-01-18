"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InvoiceButton } from "./InvoiceButton";
import InvoiceDetails from "./InvoiceDetails";
import { useAccount } from "wagmi";

import { useState } from "react";
import Web3Connect from "./Web3Connect";

type CardProps = React.ComponentProps<typeof Card>;

const tokens = [
  { label: "USDC", value: "usdc" },
  { label: "GHO", value: "gho" },
  { label: "ETH", value: "eth" },
] as const;

const FormSchema = z.object({
  paymentMethod: z.string({
    required_error: "Please select a payment method.",
  }),
});

export default function InvoiceCard({ className, ...props }: CardProps) {
  const { address } = useAccount();
  const [open, setOpen] = useState(false);
  const [triggerWidth, setTriggerWidth] = useState(0);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <div className="flex flex-col gap-4 max-w-[500px] p-6 w-full">
      <Web3Connect />
      <Card className={className} {...props}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    <FormItem className="flex flex-col w-full mb-6">
                      <FormLabel>Payment method</FormLabel>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                              ref={(node) => {
                                if (node) setTriggerWidth(node.offsetWidth);
                              }}
                            >
                              {field.value
                                ? tokens.find(
                                    (token) => token.value === field.value
                                  )?.label
                                : "Select a token"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>

                        <PopoverContent
                          className="max-w-full p-0"
                          style={{
                            width: triggerWidth,
                          }}
                        >
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
                                    form.setValue("paymentMethod", token.value);
                                    setOpen(false);
                                  }}
                                >
                                  {token.label}
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      token.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
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
  );
}
