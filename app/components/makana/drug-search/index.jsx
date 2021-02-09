import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Search from 'progressive-web-sdk/dist/components/search'

const DRUG_SEARCH_FORM_NAME = 'drug-search'

const fakeDrugs = [
    {
        _drugKey: '601',
        name: 'Fake Drug 1',
        age: 99,
    },
    {
        _drugKey: '602',
        name: 'Fake Drug 2',
        age: 40,
    },
    {
        _drugKey: '603',
        name: 'Fake Drug 3',
        age: 41,
    }
]

const fakeProductSuggestions = [
    {
        className: 'masterId_2112',
        isSimple: false,
        isfull: true,
        imageProps: {
            src:
                'https://i.pinimg.com/564x/72/4b/6d/724b6dbf91c378a53d6890bb525c1aa9.jpg',
            width: '88px',
            height: '88px',
            alt: 'cat'
        },
        href: '#',
        options: [
            {
                label: 'Dave ID 2112'
            }
        ],
        title: 'Product Title',
        price: '$2000',
        onClick: () => {
            console.log('clicked')
        }
    },
    {
        className: 'masterId_5150',
        isSimple: true,
        imageProps: {
            src:
                'https://i.pinimg.com/564x/72/4b/6d/724b6dbf91c378a53d6890bb525c1aa9.jpg',
            width: '88px',
            height: '88px',
            alt: 'cat'
        },
        href: '#',
        options: [
            {
                label: 'Dave ID 5150'
            }
        ],
        price: '$2000',
        title: 'Product Title2'
    }
]

const DrugSearch = (props) => {
    const { onDrugSelectSubmit } = props
    const [productSuggestions, setProductSuggestions] = useState([])

    const addSuggestions = (event) => {
        console.log('DrugSearch: addSuggestions() ' + event.target.value)

        if (event.target.value == '') {
            clearSuggestions()
        } else {
            const regex = new RegExp(event.target.value, 'i')
            const drugSearchResults = fakeProductSuggestions.filter(el => regex.test(el.title))
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
        
        if (onDrugSelectSubmit) onDrugSelectSubmit(selectedProductId)
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
    onDrugSelectSubmit: PropTypes.func
}

export default DrugSearch
