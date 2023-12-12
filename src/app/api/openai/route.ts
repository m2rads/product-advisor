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
        content: `This is a product name: ${productName}. We would like you to give us the features and specs of this product in only 5 bullet points. Keep the specs as short as 1 sentence. Avoid returning extra phrases and sentences. We are only interested in bullet lists. If you couldn't find any information about the product, either return the message 'no product information found. please try again.' or send some suggestions like: 'we couldn't find this product. Did you mean "this product" (suggest the closest option to it)?'. Couple notes about formating each bullet point: Make sure that you send us numbered lists that starts with a number and ends with a scape character like new line character. For example, each bullet list is represented like "1. specification.\n" .`
    };
    
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        stream: true,
        messages: [productMessage],
    });

    const stream = OpenAIStream(response)
    console.log("stream: ", stream)
    
    return new StreamingTextResponse(stream)
}