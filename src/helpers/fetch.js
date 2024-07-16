export default async function fetchData(url, body = '') {

    const response = await fetch(url, {
        method: body ? 'POST' : 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : ''
    })

    if (!response.ok) return null

    const data = await response.json()

    return data

}