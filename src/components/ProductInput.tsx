'use client'
import { Button } from "@/components/Button"
import { Container } from "@/components/Container"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ProductInput() {
    const [productName, setProductName] = useState('');
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        router.push(`/search/showcase?prodcutname=${encodeURIComponent(productName)}`)
    }

    return (
        <Container className="pb-16 pt-20 mt-20 sm:mt-0 text-center">
            <h1 className="mx-auto max-w-4xl text-5xl font-medium tracking-tight sm:text-7xl">Product Advisor</h1>
            <p className="mx-auto mt-10 text-xl max-w-2xl tracking-tight text-gray-400">Enter the product name or sku below</p>
            <form onSubmit={handleSubmit}>
                <div className="sm:col-span-2">
                    <div className="mt-10">
                        <div className="flex ">
                            <div className="flex-1 rounded-md bg-white/5 ring-white/10 ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                                <input
                                    type="text"
                                    name="product name"
                                    id="product-name"
                                    autoComplete="product-name"
                                    className="w-full border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="Enter a product name"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                />
                            </div>
                            <Button type="submit" className="ml-1">
                                <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                                </svg>
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </Container>
    )
}