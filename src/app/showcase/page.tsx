'use client'
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Loading from "./loading";
import { ProductCard } from "@/components/ProductCard";
import { PopoverWindow } from "@/components/PopoverWindow"
import { AddProduct } from "@/components/AddProduct"

export default function Page() {
    const [data, setData] = useState<string[]>([""]);
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const productName = searchParams.get("productname");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const dataClone = data
            let completeData = '';
    
            try {
                const response = await fetch(`/api/openai`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ productName }),
                });
    
                if (!response.body) {
                    throw new Error('No response body');
                }
    
                const reader = response.body.getReader();
                const decoder = new TextDecoder();
    
                while (true) {
                    const { value, done } = await reader.read();
                    if (done) break;
    
                    completeData += decoder.decode(value, { stream: true });
                }

                dataClone.push(completeData)
                setData(dataClone);
                console.log(data)
            } catch (error) {
                console.error('Error fetching data', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, [productName]);
    

    return (
        <div>
            {!data && <Loading />}
            {data && (
                <div>
                    <AddProduct />
                    <div className="flex">
                        {data.map((data, index) => (
                            <ProductCard index={index} data={data} />
                        ))}
                    </div>
                    <PopoverWindow /> 
                </div>
            )}
        </div>
    );
}
