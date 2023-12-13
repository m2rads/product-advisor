'use client'
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Loading from "./loading";
import { ProductCard } from "@/components/ProductCard";
import { PopoverWindow } from "@/components/PopoverWindow"
import { AddProduct } from "@/components/AddProduct"

export default function Page() {
    const [data, setData] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const productName = searchParams.get("productname");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const dataClone = data
    
            try {
                const response = await fetch(`/api/langchain`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ productName }),
                });
    
                if (!response.body) {
                    throw new Error('No response body');
                }
    
                const jsonData = await response.json()
                const resultData = jsonData.result

                dataClone.push(resultData)
                setData(dataClone);
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
            {data.length == 0 && <Loading />}
            {data.length >= 1 && (
                <div>
                    <AddProduct />
                    <div className="flex">
                        {data.map((data, index) => (
                            <ProductCard key={index} data={data} />
                        ))}
                    </div>
                    <PopoverWindow /> 
                </div>
            )}
        </div>
    );
}
