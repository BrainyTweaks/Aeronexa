import axios from 'axios'

const HF_API = 'https://api-inference.huggingface.co'
const HF_KEY = process.env.HF_API_KEY || ''

const hfClient = axios.create({
  baseURL: HF_API,
  headers: HF_KEY ? { Authorization: `Bearer ${HF_KEY}` } : {}
})

export async function generateText(prompt: string, model = 'google/flan-t5-large') {
  const resp = await hfClient.post(`/models/${model}`, { inputs: prompt })
  if (resp.data?.error) throw new Error(resp.data.error)
  if (Array.isArray(resp.data)) return resp.data[0]?.generated_text || ''
  return resp.data?.generated_text || JSON.stringify(resp.data)
}

export async function embedText(text: string, model = 'sentence-transformers/all-MiniLM-L6-v2') {
  // Use the embeddings endpoint
  const resp = await hfClient.post(`/embeddings/${model}`, { inputs: text })
  if (resp.data?.error) throw new Error(resp.data.error)
  // resp.data should be {embedding: [...] } or an array
  if (Array.isArray(resp.data)) return resp.data[0]?.embedding || resp.data[0]
  return resp.data?.embedding || resp.data
}

export default hfClient
