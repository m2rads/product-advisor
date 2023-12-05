'use client'
import { useSearchParams } from "next/navigation";

export default function Showcase() {
    const searchParams = useSearchParams()

    const productName = searchParams.get("productname")
    console.log(productName)

    return(
        <div>
            <p>showcase</p>
            {productName}
        </div>
        
    
    )
}