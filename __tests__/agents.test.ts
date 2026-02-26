import { createMocks } from 'node-mocks-http'
// mock axios since we don't want real HTTP during unit tests
jest.mock('axios', () => ({ get: jest.fn() }))
import masterHandler from '../src/pages/api/agents/master'

async function runApi(handler: any, method = 'GET', body = {}) {
  const { req, res } = createMocks({
    method,
    body,
  })
  await handler(req, res)
  return res
}

describe('Agents API', () => {
  it('master returns 400 when missing params', async () => {
    const res: any = await runApi(masterHandler, 'POST', {})
    expect(res._getStatusCode()).toBe(400)
  })

  it('history endpoint rejects without token', async () => {
    const historyHandler = require('../src/pages/api/history').default
    let res: any = await runApi(historyHandler, 'POST', {})
    expect(res._getStatusCode()).toBe(401)
    res = await runApi(historyHandler, 'GET', {})
    expect(res._getStatusCode()).toBe(401)
  })
})
