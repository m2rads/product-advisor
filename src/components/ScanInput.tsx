'use client'
import { Button } from "@/components/Button"
import { Container } from "@/components/Container"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function ScanInput() {
    const [productName, setProductName] = useState('');
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        router.push(`/search/showcase?productname=${encodeURIComponent(productName)}`)
    }

    return (
        <Container className="pb-16 pt-20 mt-20 sm:mt-0 text-center">
            <h1 className="mx-auto max-w-4xl text-5xl font-medium tracking-tight sm:text-7xl">Product Advisor</h1>
            <p className="mx-auto mt-10 text-xl max-w-2xl tracking-tight text-gray-400">Scan a product</p>
            
        </Container>
    )
}