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
      <div className="bg-gray-100 lg:h-screen p-6">
        <div className="bg-white rounded-xl h-full">
          <p>Invoice here</p>
        </div>
      </div>
    </div>
  );
}
