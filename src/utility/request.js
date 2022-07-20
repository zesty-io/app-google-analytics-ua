export const request = async (url, option) => {

    const response = await fetch(url, option);
    const result = await response.json()

    if(!response.ok) throw new Error(result.error)

    return result;

}