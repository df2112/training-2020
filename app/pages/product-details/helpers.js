import {getCarouselImageSizeType, getCarouselImagePropertyVariation} from '../../connector'

const CAROUSEL_IMAGE_SIZE_TYPE = getCarouselImageSizeType()
const CAROUSEL_VARIATION_PROPERTY_VARIATION = getCarouselImagePropertyVariation()

export const parseProduct = (product) => {
    product.allImages = []

    // Expand imageSet for easier filtering
    product.imageGroups.forEach((imageSet) => {
        const {images, sizeType, variationProperties} = imageSet
        images.forEach((image) => {
            product.allImages.push({...image, sizeType, variationProperties})
        })
    })

    // Inject [swatches|orderable] into variation property.
    // product.variationProperties.map((variationProperty) => {
    //     const {id, values} = variationProperty

    //     return values.map((variation) => {
    //         // Find image for variation
    //         const matchingSwatchImages = product.allImages.filter(
    //             (image) =>
    //                 image.sizeType === 'swatch' &&
    //                 (image.variationProperties || []).find((v) => {
    //                     return v.id === id && v.values.find((vv) => vv.value === variation.value)
    //                 })
    //         )

    //         // Find if variation is orderable
    //         const orderableVariations = (product.variations || []).filter(
    //             (v) => v.values[id] === variation.value && v.orderable
    //         )

    //         // Set [swatches|orderable] onto variation property.
    //         if (matchingSwatchImages.length > 0) {
    //             variation.swatches = matchingSwatchImages
    //         }
    //         variation.orderable = !!orderableVariations.length
    //         return variation
    //     })
    // })

    return product
}

export const getCarouselImages = (product, variationValues = {}) => {
    console.log({product})
    if (!product.imageGroups || product.imageGroups.length < 1) return []
    const selected = variationValues[CAROUSEL_VARIATION_PROPERTY_VARIATION]

    const carouselImages = product.imageGroups.filter((image) => {
        console.log({image})
        return image.viewType === CAROUSEL_IMAGE_SIZE_TYPE || image.viewType === 'default'
    })
    // debugger
    // Show all large images if no selected variation
    if (!selected) return carouselImages

    // Filter large images for selected variation
    const fullImages = carouselImages.filter((image) => {
        /* istanbul ignore next */
        const validVariationPropertyToShow =
            (image.variationProperties || []).find(
                (variationProperty) =>
                    variationProperty.id === CAROUSEL_VARIATION_PROPERTY_VARIATION
            ) || {}
        return (validVariationPropertyToShow.values || []).find((v) => v.value === selected)
    })

    return fullImages
}
