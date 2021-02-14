import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Search from 'progressive-web-sdk/dist/components/search'

const DRUG_SEARCH_FORM_NAME = 'drug-search'

const DrugSearch = (props) => {
    const { viewModel, onDrugSelectSubmit } = props
    const [productSuggestions, setProductSuggestions] = useState([])

    const addSuggestions = (event) => {
        console.log('DrugSearch: addSuggestions() ' + event.target.value)

        if (event.target.value == '') {
            clearSuggestions()
        } else {
            const regex = new RegExp(event.target.value, 'i')
            const drugSearchResults = viewModel.filter(el => regex.test(el.title))
            setProductSuggestions(drugSearchResults)
        }
    }

    const clearSuggestions = () => {
        console.log('DrugSearch: clearSuggestions()')
        setProductSuggestions([])
    }

    const clickSuggestion = (event) => {
        console.log('DrugSearch: clickSuggestion()')

        // TODO: Clean this mess up :-)
        const bbb = [ ...event.target.closest('article').classList ]
        const ccc = bbb.find(e => e.includes('masterId_'))
        const selectedProductId = ccc.replace('masterId_', '')

        setProductSuggestions([])
        
        if (onDrugSelectSubmit) onDrugSelectSubmit('add', selectedProductId)
    }

    return (
        <div>
            <Search
                productSuggestions={productSuggestions}
                onChange={addSuggestions}
                //onClose={clearSuggestions}
                onClear={clearSuggestions}
                onClickSuggestion={clickSuggestion}
                suggestedProductsHeading=''
                submitButtonProps={{text:''}}
            />
        </div>
    )
}

DrugSearch.propTypes = {
    viewModel: PropTypes.array,
    onDrugSelectSubmit: PropTypes.func
}

export default DrugSearch
