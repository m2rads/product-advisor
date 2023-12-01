import {Container} from "@/components/Container"
import { Button } from "./Button"

export function Hero () {
    return (
       <Container className="pb-40 pt-60 text-center">
                <h1 className="mx-auto max-w-4xl text-5xl font-medium tracking-tight sm:text-7xl">Product Advisor</h1>
                <p className="mx-auto mt-10 text-xl max-w-2xl tracking-tight text-gray-400">Select a method to look for a product</p>
                <div className="mt-10 flex justify-center gap-x-6">
                    <Button>
                        icon
                    </Button>
                </div>
       </Container>
    )
}