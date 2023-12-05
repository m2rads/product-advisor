// import OpenAI from "openai"
// import { OpenAIStream, StreamingTextResponse } from 'ai'
import { NextRequest, NextResponse } from "next/server"

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// })

export const runtime = 'edge'

export async function POST(req: NextRequest) {
    const productName = await req.json();
    // const { messages } = await req.json()
    // const response = await openai.chat.completions.create({
    //      model: 'gpt-3.5-turbo',
    //      stream: true,
    //      messages,
    // })

    // const stream = OpenAIStream(response)
    
    // return new StreamingTextResponse(stream)

    return new NextResponse(JSON.stringify({
        productName,
    }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
          },
    })
}
