export const get = (url: string, headers?: any) => {
    return fetch(url, {
        headers,
        method: 'GET',
    }).then((response) => {
        return response.json()
    })
}
