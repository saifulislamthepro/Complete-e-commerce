"use client";
export const dynamic = "force-dynamic";

import { Suspense } from "react";
import CheckoutPage from "@/components/OrderNowCheckout";
import "./style.css";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutPage/>
    </Suspense>
  );

}