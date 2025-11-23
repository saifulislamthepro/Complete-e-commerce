"use client"
export const dynamic = "force-dynamic";

import { Suspense } from "react";
import ResetPassword from "@/components/ResetPass";


export default function () {

  
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPassword/>
      </Suspense>
    );
}