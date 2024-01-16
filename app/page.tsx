import dynamic from "next/dynamic";

const Web3ConnectoSSR = dynamic(() => import("@/components/Web3Connect"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="container my-4">
      <Web3ConnectoSSR />
    </div>
  );
}
