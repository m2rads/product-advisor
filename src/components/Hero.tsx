'use client'
import {Container} from "@/components/Container"
import { Button } from "./Button"
import { useState } from "react"
import ProductInput from "./ProductInput"
import { ScanInput } from "./ScanInput"

interface BackButtonProps {
    setShowScan: React.Dispatch<React.SetStateAction<boolean>>;
    setShowInput: React.Dispatch<React.SetStateAction<boolean>>;
}

const BackButton : React.FC<BackButtonProps> = ({setShowScan, setShowInput} ) => {
    const handleBackClick = () => {
        setShowScan(false);
        setShowInput(false);
    };
    return(
        <header className="py-10">
                <Container>
                    <nav className="relative z-50 flex justify-between">
                    <div className="flex items-center md:gap-x-12">
                    <button onClick={(e) => handleBackClick()} type="button" className="w-full flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
                        <svg className="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                        </svg>
                        <span>Back</span>
                    </button>
                    </div>
                    <div className="flex items-center gap-x-5 md:gap-x-8">
                        {/* empty  */}
                    </div>
                    </nav>
                </Container>
        </header>
    )
}

export function Hero () {
    const [showScan, setShowScan] = useState(false);
    const [showInput, setShowinput] = useState(false);


    return (
       <div>
            {showScan && (
                <>
                    <BackButton
                        setShowInput={setShowinput}
                        setShowScan={setShowScan}
                    />
                    <ScanInput />
                </>
            )}
            {showInput && (
                <>
                    <BackButton 
                         setShowInput={setShowinput}
                         setShowScan={setShowScan}
                    />
                    <ProductInput />
                </>
            )}
            {!showScan && !showInput && (
                <Container className="pb-16 pt-20 mt-20 sm:mt-0 text-center">
                    <h1 className="mx-auto max-w-4xl text-5xl font-medium tracking-tight sm:text-7xl">Product Advisor</h1>
                    <p className="mx-auto mt-10 text-xl max-w-2xl tracking-tight text-gray-400">Select a method to look for a product</p>
                    <div className="mt-20 flex justify-center gap-x-6">
                        <Button onClick={(e) => {
                            setShowScan(true) 
                            setShowinput(false)
                            }}>
                            <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                            </svg>
                        </Button>
                        <Button onClick={(e) => {
                            setShowScan(false) 
                            setShowinput(true)
                            }}>
                            <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                            </svg>
                        </Button>
                    </div>
                </Container>
            )}
            
       </div>
    )
}