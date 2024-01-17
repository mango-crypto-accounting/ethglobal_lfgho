import React from "react";

export default function InvoiceDetails() {
  return (
    <div className="border-b pb-8 mb-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">To</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-gray-800">Dynamic Labs, Inc.</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">From</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-gray-800">Maple Finance</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Amount due</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-gray-800">$5,000.00</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Due on</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-gray-800">Sep 1, 2023</p>
        </div>
      </div>
    </div>
  );
}
