import axios from 'axios'

export async function findAttractions(lat: number, lon: number, limit = 8) {
  // Use Wikipedia geosearch to find nearby places of interest
  const gsUrl = `https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gscoord=${lat}%7C${lon}&gsradius=10000&gslimit=${limit}&format=json&origin=*`
  const r = await axios.get(gsUrl)
  const places = r.data?.query?.geosearch || []

  const results: any[] = []
  for (const p of places) {
    const pageId = p.pageid
    const pageResp = await axios.get(`https://en.wikipedia.org/w/api.php?action=query&prop=extracts|info&pageids=${pageId}&inprop=url&exintro=true&format=json&origin=*`)
    const page = pageResp.data?.query?.pages?.[pageId]
    const title = page?.title || p.title
    const extract = page?.extract || ''
    const pageUrl = page?.fullurl || `https://en.wikipedia.org/?curid=${pageId}`

    // Basic heuristic for family/women safety (placeholder)
    const unsafeKeywords = ['riot', 'attack', 'war', 'shooting', 'protest']
    const lower = (title + ' ' + extract).toLowerCase()
    const safety = unsafeKeywords.some((k) => lower.includes(k)) ? 'not_recommended' : 'generally_safe'

    // Google Calendar add link (public template)
    const gcalLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Visit ' + title)}&details=${encodeURIComponent(extract.slice(0,200))}&location=${encodeURIComponent(pageUrl)}`

    results.push({ title, extract, url: pageUrl, safety, gcalLink })
  }

  return results
}
