"use client";
export const dynamic = "force-dynamic";

import { Suspense } from "react";
import CheckoutCartPage from "@/components/Checkout";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutCartPage/>
    </Suspense>
  );

}


