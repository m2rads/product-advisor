'use client'
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Container } from "./Container";

export default function ProductInput() {
    const [productName, setProductName] = useState('');
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.push(`/showcase?productname=${productName}`);
    };

    return (
        <Container className="pb-16 pt-20 mt-20 sm:mt-0 text-center">
            <div className="mt-10">
                <form onSubmit={handleSubmit} className="flex flex-wrap justify-center px-4 rounded-lg items-baseline bg-slate-900 shadow-md pt-6 pb-6 mb-4 gap-4">
                    <div className="flex-grow min-w-0 md:flex-grow">
                        <input 
                            className="w-full py-4 shadow appearance-none border rounded px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username" 
                            type="text" 
                            placeholder="Github Username" 
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-end">
                        <button className="bg-blue-500 py-4 px-4 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline" type="submit">
                            next
                        </button>
                    </div>
                </form>
            </div>
        </Container>


    )
}