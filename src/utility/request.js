export const request = (url, option) => {

    return fetch(url, option).then(result => {
        return result.json()
    }).catch(error => {
        throw error
    })

}