import React from "react";
import Link from "next/link";

export default function Home() {
    return (
        <>
        <h1>Home</h1>
        <div>
            <Link href="/doctor/create">Create new doctor</Link>
            <br />
             <Link href="/pacient/create">Create new pacient</Link>
                         <br />
            <Link href="/appointment/create">Create new appointment</Link>
                        <br />
            <Link href="/prescription/create">Create new prescription</Link>
        </div>
        </>
    );
}