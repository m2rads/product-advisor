import OpenAI from "openai"
import { ChatCompletionMessageParam } from "openai/resources/index.mjs"
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { NextRequest, NextResponse } from "next/server"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export const runtime = 'edge'

export async function POST(req: NextRequest) {
    const { productName } = await req.json();
    // sanitize the product name: 
    const productMessage: ChatCompletionMessageParam = {
        role: 'user', 
        content: `This is a product sku: ${productName}. We would like you to give us the features and specs of this product in bullet points. Avoid returning extra phrases and sentences. We are only interested in bullet lists. If you couldn't find any information about the product, either return the message 'no product information found. please try again.' or send some suggestions like: 'we couldn't find this product. Did you mean "this product" (suggest the closest option to it)?'`
    };
    
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        stream: false,
        messages: [productMessage],
    });

    // const stream = OpenAIStream(response)
    
    // return new StreamingTextResponse(stream)

    console.log(response.choices[0].message.content)

    return new NextResponse(JSON.stringify({
        response,
    }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
          },
    })
}
