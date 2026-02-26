// Models helper — abstract model provider selection
export type ModelProvider = 'hf' | 'openai' | 'local'

export interface ModelClient {
  generate: (prompt: string, opts?: any) => Promise<string>
}

// Placeholder: actual implementations will be added later
export function createModelClient(provider: ModelProvider): ModelClient {
  return {
    generate: async (prompt: string) => {
      return `Echo from ${provider}: ${prompt}`
    }
  }
}
