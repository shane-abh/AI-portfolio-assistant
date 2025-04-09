import { ChatGroq } from "@langchain/groq";

export const  deepseekR1LLM = new ChatGroq({
    model: "deepseek-r1-distill-llama-70b",
    temperature: 0.1, // Reduced from 0.6 for more consistent outputs
    max_completion_tokens: 4096,
    max_retries: 2,
    top_p: 0.95,
    stream: false,
    response_format: {
      type: "json_object",
    },
    stop: null,
    apiKey: process.env.GROQ_API_KEY,
  });

  export const gemma2LLM = new ChatGroq({
    model: "gemma2-9b-it",
    temperature: 1,
    max_completion_tokens: 1024,
    top_p: 1,
    stream: true,
    stop: null,
    apiKey: process.env.GROQ_API_KEY,
  });

  export const llama70bversatile = new ChatGroq({
    model: "llama-3.3-70b-versatile",
    temperature: 0,
    maxTokens: undefined,
    maxRetries: 2,
    apiKey: process.env.GROQ_API_KEY,
    
  });