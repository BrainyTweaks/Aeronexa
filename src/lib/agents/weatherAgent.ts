import axios from 'axios'

export async function getWeather(lat: number, lon: number) {
  // Use Open-Meteo for current + 7-day forecast
  const url = 'https://api.open-meteo.com/v1/forecast'
  const resp = await axios.get(url, { params: { latitude: lat, longitude: lon, daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum', timezone: 'auto' } })
  const daily = resp.data?.daily || {}

  // Simple recommendation: good if low precipitation and mild temps
  const recommendations = daily?.precipitation_sum?.map((p: number, i: number) => {
    const tmax = daily.temperature_2m_max?.[i]
    const tmin = daily.temperature_2m_min?.[i]
    const good = p < 2 && tmax >= 10 && tmax <= 32
    return { dayIndex: i, tmin, tmax, precipitation: p, goodTimeToTravel: good }
  })

  return { daily: recommendations }
}
