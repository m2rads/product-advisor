'use client'
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Showcase() {
    const [data, setData] = useState(null);
    const searchParams = useSearchParams()
    const productName = searchParams.get("productname")

    useEffect(() => {

    }, [productName])

    return(
        <div>
            <p>showcase</p>
            {productName}
        </div>
    )
}