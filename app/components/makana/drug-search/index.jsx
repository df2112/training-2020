import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Button from 'progressive-web-sdk/dist/components/button'
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
        className: 'id_2112',
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
        className: 'id_5150',
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
    const [isOverlayOpen, setIsOverlayOpen] = useState(false)

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
        console.log(event.target.closest('article'))
        setProductSuggestions([])
        
        if (onDrugSelectSubmit) onDrugSelectSubmit('dumdum')
    }

    return (
        <div>
            {/* <Search
                isOverlay
                isOpen={isOverlayOpen}
                productSuggestions={productSuggestions}
                onChange={addSuggestions}
                onClose={clearSuggestions}
                onClear={clearSuggestions}
                onClickSuggestion={clickSuggestion}
                suggestedProductsHeading=''
                submitButtonProps={{text:''}}
            />
            <button onClick={() => setIsOverlayOpen(true)}>Open search overlay</button> */}
            <Search
                productSuggestions={productSuggestions}
                onChange={addSuggestions}
                onClose={clearSuggestions}
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
