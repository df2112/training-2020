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

const fakeTermSuggestions = [{ href: '#', children: 'test' }, { children: 'search' }]

const fakeProductSuggestions = [
    {
        isSimple: true,
        imageProps: {
            src:
                'https://i.pinimg.com/564x/72/4b/6d/724b6dbf91c378a53d6890bb525c1aa9.jpg',
            width: '88px',
            height: '88px',
            alt: 'cat'
        },
        title: 'Product Title',
        price: '$2000',
        onClick: () => {
            console.log('clicked')
        }
    },
    {
        isSimple: true,
        imageProps: {
            src:
                'https://i.pinimg.com/564x/72/4b/6d/724b6dbf91c378a53d6890bb525c1aa9.jpg',
            width: '88px',
            height: '88px',
            alt: 'cat'
        },
        href: '#',
        price: '$2000',
        title: 'Product Title2'
    }
]

const DrugSearch = (props) => {
    // const [termSuggestions, setTermSuggestions] = useState(null)
    const [productSuggestions, setProductSuggestions] = useState([fakeProductSuggestions])

    const addSuggestions = (event) => {

        if (event.target.value == '') {
            clearSuggestions()
        } else {
            setProductSuggestions(fakeProductSuggestions)
        }
        //setTermSuggestions(fakeTermSuggestions)
    }

    const clearSuggestions = () => {
        //setTermSuggestions([])
        setProductSuggestions([])
    }

    return (
        <Search
            // termSuggestions={termSuggestions}
            productSuggestions={productSuggestions}
            onChange={addSuggestions}
            onClose={clearSuggestions}
            onClear={clearSuggestions}
            onClickSuggestion={clearSuggestions}
            suggestedProductsHeading=''
        />)
}

export default DrugSearch
