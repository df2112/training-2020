import React, { Fragment, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import Button from 'progressive-web-sdk/dist/components/button'
import List from 'progressive-web-sdk/dist/components/list'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'
import { getAnalyticsManager } from '../../analytics'

const analyticsManager = getAnalyticsManager()
const DRUG_SEARCH_FORM_NAME = 'drug-search'

export const validate = (values) => {
    const errors = {}
    if ((values.email || '').search(/@mobify.com$/) < 0) {
        errors.email = 'Must be a @mobify.com email address'
    }
    return errors
}

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

const DrugSearch = (props) => {
    const { onDrugSelectSubmit } = props
    const [error, setError] = useState(false)
    const [drugSearchResults, setDrugSearchResults] = useState([])

    const handleDrugSearchSubmit = (event) => {
        console.log('DrugSearch: handleDrugSearchSubmit()')

        const formData = new FormData(event.target)
        // TODO: Validate formData

        // TODO: 
        // Fix this filter of fakeDrugs against the input search fields
        //
        // Need to update all of the various hardcoded drugs arrays in
        // all components/pages so that they have fields for city, state, zip etc
        //

        const drugSearchResults = fakeDrugs.filter(el => 
            el._drugKey == formData.get('name') ||
            el.name == formData.get('name') ||
            el.age == formData.get('name'))

        event.preventDefault() //TODO: This needs to be reviewed
        setDrugSearchResults(drugSearchResults)
    }

    const handleDrugSelectSubmit = (drugId) => {
        console.log('DrugSearch: handleDrugSelectSubmit()')
        
        if (onDrugSelectSubmit) onDrugSelectSubmit(drugId)
    }

    return (
        <form
            id={DRUG_SEARCH_FORM_NAME}
            className="c-drug-search"
            data-analytics-name={DRUG_SEARCH_FORM_NAME}
            onSubmit={handleDrugSearchSubmit}
        >

            {/* Name */}
            <div className="c-drug-search__form-field-row u-flexbox">
                <div className={`c-drug-search__form-field u-flex ${error ? 'c-drug-search__form-field-error' : ''}`}>
                    <div className="c-drug-search__form-field-inner">
                        <div className="c-drug-search__form-field-label-wrap">
                            <label className="c-drug-search__form-field-label" htmlFor="drug-search-name">{'Name'}</label>
                        </div>
                        <div className="c-drug-search__form-field-input">
                            <input id="drug-search-name" name="name" type="text" data-analytics-name="email" className="u-flex"
                                required />
                        </div>
                        {error && (
                            <div className="c-drug-search__form-field-error-text">
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* City */}
            <div className="c-drug-search__form-field-row u-flexbox">
                <div className={`c-drug-search__form-field u-flex ${error ? 'c-drug-search__form-field-error' : ''}`}>
                    <div className="c-drug-search__form-field-inner">
                        <div className="c-drug-search__form-field-label-wrap">
                            <label className="c-drug-search__form-field-label" htmlFor="drug-search-city">{'City'}</label>
                        </div>
                        <div className="c-drug-search__form-field-input">
                            <input id="drug-search-city" name="city" type="text" data-analytics-name="email" className="u-flex"
                                required />
                        </div>
                        {error && (
                            <div className="c-drug-search__form-field-error-text">
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* State */}
            <div className="c-drug-search__form-field-row u-flexbox">
                <div className={`c-drug-search__form-field u-flex ${error ? 'c-drug-search__form-field-error' : ''}`}>
                    <div className="c-drug-search__form-field-inner">
                        <div className="c-drug-search__form-field-label-wrap">
                            <label className="c-drug-search__form-field-label" htmlFor="drug-search-state">{'State'}</label>
                        </div>
                        <div className="c-drug-search__form-field-input">
                            <input id="drug-search-state" name="state" type="text" data-analytics-name="email" className="u-flex"
                                required />
                        </div>
                        {error && (
                            <div className="c-drug-search__form-field-error-text">
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Zip */}
            <div className="c-drug-search__form-field-row u-flexbox">
                <div className={`c-drug-search__form-field u-flex ${error ? 'c-drug-search__form-field-error' : ''}`}>
                    <div className="c-drug-search__form-field-inner">
                        <div className="c-drug-search__form-field-label-wrap">
                            <label className="c-drug-search__form-field-label" htmlFor="drug-search-zip">{'Zip'}</label>
                        </div>
                        <div className="c-drug-search__form-field-input">
                            <input id="drug-search-zip" name="zip" type="text" data-analytics-name="email" className="u-flex"
                                required />
                        </div>
                        {error && (
                            <div className="c-drug-search__form-field-error-text">
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="c-drug-search__form-field-row u-flexbox">
                <div className="c-drug-search__form-field c-drug-search__button u-flex-none u-margin-start-0">
                    <div className="c-drug-search__form-field-inner">
                        <div className="c-drug-search__form-field-input">
                            <div className="c-drug-search__form-field-label" aria-hidden="true"></div>
                            <Button type="submit" className="pw--primary">Search Drugs</Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fake Drug Search Results */}
            <List>
                {drugSearchResults.map((item) => (
                    <ListTile
                        className="pw--instructional-block"
                        key={item._drugKey}
                        endAction={
                            <Button 
                                className="pw--blank" 
                                icon="trash" 
                                onClick={() => handleDrugSelectSubmit(item._drugKey)} 
                            />
                        }
                    >
                        <span>
                            {item.name} : {item.age}
                        </span>
                    </ListTile>
                ))}
            </List>

        </form>
    )
}

DrugSearch.propTypes = {
    /**
     * Handler that is triggers when the form is submitted
     */
    onDrugSelectSubmit: PropTypes.func
}

export default DrugSearch
