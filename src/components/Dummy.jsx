'use client'
import { useState } from "react"

export function Dummy() {
    const [productName, setProductName] = useState("")

    const handleSubmit = async () => {
        const result = await fetch('/api/langchain', {
            method: 'POST',
            headers: { 'Content-Type': 'applicaiton/json' },
            body: JSON.stringify({ productName })
        })

        setProductName("")
    }

    return(
        <div>
            <input className="text-black bg-gray-300 p-2 m-2" value={productName} onChange={(e) => setProductName(e.target.value)} />
            <button onClick={handleSubmit}>hit langchain</button>
      </div>
    )
}