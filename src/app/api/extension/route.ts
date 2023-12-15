import { OpenAI } from "langchain/llms/openai";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { NextRequest, NextResponse } from "next/server";

// Set up OpenAI Model with API Key
const model = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: 'gpt-3.5-turbo',
    maxTokens: 200,
    topP: 0.2,
});

// const model = new OpenAI({
//     modelName: 'gpt-3.5-turbo',
//     temperature: 0.5,
//     azureOpenAIApiKey: "4c8ba32907644beda3de4578be1d1839",
//     azureOpenAIApiDeploymentName: "bbyc-devtest-acai-2-productadvisor-dt-001",
//   });

// Initialize memory
const memory = new BufferMemory();

// Set up the conversation chain
const chain = new ConversationChain({
    llm: model,
    memory: memory,
});

export const runtime = 'edge';

export async function POST(req: NextRequest) {
    const { productInfo, chatInput } = await req.json();
    console.log("Received input: ", chatInput);

    let content = '';

    if (productInfo) {
        const productInfoStr = JSON.stringify(productInfo, null, 2);
        content = `I am providing details of one or more products. As a product advisor, use your knowledge and the information given to accurately respond to customer inquiries. Each response should be tailored to the specific product mentioned in the question and address the customer's needs or concerns directly. Refer to each product by its name to ensure clarity and relevance in your advice.

        Product Information: ${productInfoStr}`;
    } else if (chatInput) {
        content = `Based on the detailed product information provided, along with your extensive knowledge base, please respond to the customer's query. Your answer should be informative, precise, and directly address the specific details or concerns raised in the question. Ensure that your response is based both on the product data available and relevant insights from your prior training. Address yourself as product advisor. You are directly talking to the customer.

        Customer's Question: ${chatInput}`;
    }

    const response = await chain.run(content);

    console.log(response)

    return new NextResponse(JSON.stringify({
        response,
    }), { 
        status: 200,
        headers: {'Content-Type': 'application/json'}
    })
}

export async function GET() {
    const response = "hello"

    return new NextResponse(JSON.stringify({
        response,
    }), { 
        status: 200,
        headers: {'Content-Type': 'application/json'}
    })
}
