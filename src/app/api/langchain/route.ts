// import { ChatOpenAI } from "langchain/chat_models/openai";
// import { ChatPromptTemplate } from "langchain/prompts";
// import { BaseOutputParser } from "langchain/schema/output_parser";
// import { NextRequest, NextResponse } from "next/server";
// import { BufferMemory } from "langchain/memory";
// import { ConversationChain } from "langchain/chains";
// import { BaseLLMOutputParser } from "langchain/schema/output_parser";


// /** 
//  * Parse the output of an LLM into a comma seperated or an array?
//  */
// // class CommaSeparatedListOutputParser extends BaseOutputParser<string[]> {
// //     lc_namespace: string[];

// //     constructor() {
// //         super();
// //         this.lc_namespace = ['prodcut spec format'];
// //     }

// //     async parse(text: string): Promise<string[]> {
// //         return text.split(",").map((item) => item.trim());
// //     }

// //     getFormatInstructions(): string {
// //         return 'format instructions here';

// //     }
// // }

// class CommaSeparatedListOutputParser extends BaseLLMOutputParser<string[]> {
//     lc_namespace: string[];

//     constructor() {
//         super();
//         this.lc_namespace = ['product spec format'];
//     }

//     async parse(text: string): Promise<string[]> {
//         return text.split(",").map((item) => item.trim());
//     }

//     getFormatInstructions(): string {
//         return 'format instructions here';
//     }

//     async parseResult(result: any): Promise<string[]> {
//         const parsedResult = await this.parse(result);

//         return parsedResult;
//     }
// }

// const template = `You are a product expert that works for BestBuy. You know all the featuers and specs of a product. When asked about a specific product, you respond with the the features and specs of this product in only 5 comma seperated points. Keep the specs as short as 1 sentence. Avoid returning extra phrases and sentences. We yhgbtvfcdxcdf  dxcxxcare only interested in specs. If you couldn't find any information about the product, either return the message 'no product information found. please try again.' or send some suggestions like: 'we couldn't find this product. Did you mean "this product" (suggest the closest option to it)?'.`

// const customerTemplate = "{productName}"


// const chatPrompt = ChatPromptTemplate.fromMessages([
//     ["system", template],
//     ["human", customerTemplate],
// ])

// const model = new ChatOpenAI({})
// const parser = new CommaSeparatedListOutputParser();
// const memory = new BufferMemory();

// // const chain = chatPrompt.pipe(model).pipe(parser);
// const chain = new ConversationChain({llm: model, memory: memory})


// export const runtime = 'edge'

// export async function POST(req: NextRequest) {
//     const {productName} = await req.json()

//     console.log("we got hit")


//     const result = await chain.call({
//         productName: productName,
//     })

//     console.log(result)
    
//     return new NextResponse(JSON.stringify({
//         result,
//     }), {
//         status: 200,
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
// }


import { OpenAI } from "langchain/llms/openai";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { NextRequest, NextResponse } from "next/server";

// Set up OpenAI Model with API Key
const model = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: 'gpt-3.5-turbo',
});

// Initialize memory
const memory = new BufferMemory();

// Set up the conversation chain
const chain = new ConversationChain({
    llm: model,
    memory: memory,
});

export const runtime = 'edge';

export async function POST(req: NextRequest) {
    const { productName, chatInput } = await req.json();
    console.log("Received input: ", chatInput);

    let content = '';

    if (productName) {
        content = `This is a product name ${productName}. We expect you to give us 5 comma seperated points of specs and nothing else. Here is an input example: WH-CH720N. This is the output we want from you: [point1, point2, point3, point4, poin5]. Keep eahc point to a maximum 1 sentence. Do not say Sure! Here are 5 comma-separated points of specs for the product and do not say I hope this meets your requirements! Let me know if there's anything else I can assist you with. The only thing we want from you is the list that's it.`;
    } else if (chatInput) {
        content = `This is my question regarding the information that I recieved from you previously. Question: ${chatInput}.`;
    }

    const response = await chain.run(content);

    console.log(response)

    return new NextResponse(JSON.stringify({
        response,
    }), { 
        status: 200,
        headers: {'Content-Type': 'application/json'}
    })}
