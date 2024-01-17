import dynamic from "next/dynamic";

const Web3ConnectoSSR = dynamic(() => import("@/components/Web3Connect"), {
  ssr: false,
});

const InvoiceCardSSR = dynamic(() => import("@/components/InvoiceCard"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="bg-white h-screen flex items-center justify-center">
        <div className="flex flex-col gap-4 max-w-[500px] p-6 w-full">
          <Web3ConnectoSSR />
          <InvoiceCardSSR className="w-full" />
        </div>
      </div>
      <div className="bg-gray-100 lg:h-screen p-6 flex items-center justify-center">
        <div className="bg-white rounded-xl w-full p-6 shadow-md">
          <div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="text-sm font-medium text-gray-500">Item 1</p>
                <p className="text-sm font-bold text-gray-800">$2,000.00</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-medium text-gray-500">Item 2</p>
                <p className="text-sm font-bold text-gray-800">$3,000.00</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-medium text-gray-500">Item 3</p>
                <p className="text-sm font-bold text-gray-800">$3,800.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
