import { Container } from "@/components/Container"
import { Button } from "@/components/Button"

export default function Search() {
    return (
        <Container className="pb-40 pt-60 mt-20 sm:mt-0 text-center">
                <h1 className="mx-auto max-w-4xl text-5xl font-medium tracking-tight sm:text-7xl">Product Advisor</h1>
                <p className="mx-auto mt-10 text-xl max-w-2xl tracking-tight text-gray-400">Enter the product name or sku below</p>
                <form action="">
                    <div className="sm:col-span-2">
                        <div className="mt-10">
                            <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                            <input
                                type="text"
                                name="username"
                                id="username"
                                autoComplete="username"
                                className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="Enter a product name"
                            />
                            <Button>
                                <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
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