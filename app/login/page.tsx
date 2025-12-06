"use client"
export const dynamic = "force-dynamic";

import { Suspense } from "react";
import LoginPage from "@/components/Login";
import "./style.css"



export default function Page () {

  
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <LoginPage/>
      </Suspense>
    );
}