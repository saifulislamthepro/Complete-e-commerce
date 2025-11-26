"use client"
export const dynamic = "force-dynamic";

import { Suspense } from "react";
import SignupPage from "@/components/SignUp";
import "../login/style.css";

export default function Page () {

  
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <SignupPage/>
      </Suspense>
    );
}