"use client"

import { signOut } from "next-auth/react"


export default function LogOutComp() {


    return(
    <button onClick={()=> signOut()}><i className="fa-solid fa-right-from-bracket"></i> LogOut</button>
    )
}