class FetchError extends Error {
    constructor(response) {
        const message = `Fetch Error: ${response.status}: ${response.statusText}`
        super(message)

        this.response = response
        this.status = response.status
        this.statusText = response.statusText
    }
}

export const checkHttpError = (response) => {
    if (response.ok) {
        return response
    }
    console.error(response, response.status, response.statusText)
    throw new FetchError(response)
}
