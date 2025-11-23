"use client";
export const dynamic = "force-dynamic";

import { Suspense } from "react";
import "../login/style.css";

import VerifyOtpComp from "@/components/ConfirmOtp";


export default function Page() {

  
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyOtpComp/>
      </Suspense>
    );
}