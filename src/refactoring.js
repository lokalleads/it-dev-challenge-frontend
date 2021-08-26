const evaluateCondition = (condition, values, settings) => {}

const filterOptionMethod = (
    options,
    values,
    outputDownloadOption,
    generatedOffer
) => {
    return options.filter(option => {
        if (option.condition) {
            return evaluateCondition(option.condition, values, {
                outputDownloadOption,
                generatedOffer
            })
        }
        return true
    })
}

const filterOptions = (element, values, { outputDownloadOption, generatedOffer }) => {
    if (element.options && element.options.length) {
        return {
            ...element,
            options: filterOptionMethod(element.options, values, {
                outputDownloadOption,
                generatedOffer
            })
        }
    }
    return element
}

export default filterOptions;
