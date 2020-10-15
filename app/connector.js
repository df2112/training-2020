
import CommerceCloudConnector from './commerce-cloud-connector'
import {getProtocolHostAndPort} from './utils/utils'

// Replace Mobify's demo config with the correct values for your backend:
export const getConnector = () => new CommerceCloudConnector({
    apiBaseURL: `${getProtocolHostAndPort()}/mobify/proxy/commerce-api`
})

// Return any connector-specific constants for root category ids, etc.
export const getRootCategoryId = () => {
    return 'root'
}

export const getCarouselImageSizeType = () => {
    return 'large'
}

export const getCarouselImagePropertyVariation = () => {
    return 'color'
}
