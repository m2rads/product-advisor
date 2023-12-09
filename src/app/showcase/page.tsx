'use client'
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Showcase() {
    const [data, setData] = useState(null);
    const searchParams = useSearchParams()
    const productName = searchParams.get("productname")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/openai`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ productName }),
                })
                if (!response.ok) {
                  throw new Error('Network response was not ok')
                }
                const data = await response.json();
                console.log("data: ", data)
                setData(data);
              } catch (error) {
                  console.log('Error fetching Github stats', error);
              } finally {
                // this is for setLoading state 
              }
        }
        fetchData()

    }, [productName]);

    return(
        <div>
            <p>showcase</p>
            {JSON.stringify(data, null, 2)}
        </div>
    )
}