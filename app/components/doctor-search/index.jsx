import React, { Fragment, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import Button from 'progressive-web-sdk/dist/components/button'
import List from 'progressive-web-sdk/dist/components/list'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'
import { getAnalyticsManager } from '../../analytics'

const analyticsManager = getAnalyticsManager()
const DOCTOR_SEARCH_FORM_NAME = 'doctor-search'

export const validate = (values) => {
    const errors = {}
    if ((values.email || '').search(/@mobify.com$/) < 0) {
        errors.email = 'Must be a @mobify.com email address'
    }
    return errors
}

const fakeDoctors = [
    {
        _doctorKey: '601',
        name: 'Fake Doctor 1',
        age: 99,
    },
    {
        _doctorKey: '602',
        name: 'Fake Doctor 2',
        age: 40,
    },
    {
        _doctorKey: '603',
        name: 'Fake Doctor 3',
        age: 41,
    }
]

const DoctorSearch = (props) => {
    const { onDoctorSelectSubmit } = props
    const [error, setError] = useState(false)
    const [doctorSearchResults, setDoctorSearchResults] = useState([])

    const handleDoctorSearchSubmit = (event) => {
        console.log('DoctorSearch: handleDoctorSearchSubmit()')

        const formData = new FormData(event.target)
        // TODO: Validate formData

        // TODO: 
        // Fix this filter of fakeDoctors against the input search fields
        //
        // Need to update all of the various hardcoded doctors arrays in
        // all components/pages so that they have fields for city, state, zip etc
        //

        const doctorSearchResults = fakeDoctors.filter(el => 
            el._doctorKey == formData.get('name') ||
            el.name == formData.get('name') ||
            el.age == formData.get('name'))

        event.preventDefault() //TODO: This needs to be reviewed
        setDoctorSearchResults(doctorSearchResults)
    }

    const handleDoctorSelectSubmit = (doctorId) => {
        console.log('DoctorSearch: handleDoctorSelectSubmit()')
        
        if (onDoctorSelectSubmit) onDoctorSelectSubmit(doctorId)
    }

    return (
        <form
            id={DOCTOR_SEARCH_FORM_NAME}
            className="c-doctor-search"
            data-analytics-name={DOCTOR_SEARCH_FORM_NAME}
            onSubmit={handleDoctorSearchSubmit}
        >

            {/* Name */}
            <div className="c-doctor-search__form-field-row u-flexbox">
                <div className={`c-doctor-search__form-field u-flex ${error ? 'c-doctor-search__form-field-error' : ''}`}>
                    <div className="c-doctor-search__form-field-inner">
                        <div className="c-doctor-search__form-field-label-wrap">
                            <label className="c-doctor-search__form-field-label" htmlFor="doctor-search-name">{'Name'}</label>
                        </div>
                        <div className="c-doctor-search__form-field-input">
                            <input id="doctor-search-name" name="name" type="text" data-analytics-name="email" className="u-flex"
                                required />
                        </div>
                        {error && (
                            <div className="c-doctor-search__form-field-error-text">
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* City */}
            <div className="c-doctor-search__form-field-row u-flexbox">
                <div className={`c-doctor-search__form-field u-flex ${error ? 'c-doctor-search__form-field-error' : ''}`}>
                    <div className="c-doctor-search__form-field-inner">
                        <div className="c-doctor-search__form-field-label-wrap">
                            <label className="c-doctor-search__form-field-label" htmlFor="doctor-search-city">{'City'}</label>
                        </div>
                        <div className="c-doctor-search__form-field-input">
                            <input id="doctor-search-city" name="city" type="text" data-analytics-name="email" className="u-flex"
                                required />
                        </div>
                        {error && (
                            <div className="c-doctor-search__form-field-error-text">
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* State */}
            <div className="c-doctor-search__form-field-row u-flexbox">
                <div className={`c-doctor-search__form-field u-flex ${error ? 'c-doctor-search__form-field-error' : ''}`}>
                    <div className="c-doctor-search__form-field-inner">
                        <div className="c-doctor-search__form-field-label-wrap">
                            <label className="c-doctor-search__form-field-label" htmlFor="doctor-search-state">{'State'}</label>
                        </div>
                        <div className="c-doctor-search__form-field-input">
                            <input id="doctor-search-state" name="state" type="text" data-analytics-name="email" className="u-flex"
                                required />
                        </div>
                        {error && (
                            <div className="c-doctor-search__form-field-error-text">
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Zip */}
            <div className="c-doctor-search__form-field-row u-flexbox">
                <div className={`c-doctor-search__form-field u-flex ${error ? 'c-doctor-search__form-field-error' : ''}`}>
                    <div className="c-doctor-search__form-field-inner">
                        <div className="c-doctor-search__form-field-label-wrap">
                            <label className="c-doctor-search__form-field-label" htmlFor="doctor-search-zip">{'Zip'}</label>
                        </div>
                        <div className="c-doctor-search__form-field-input">
                            <input id="doctor-search-zip" name="zip" type="text" data-analytics-name="email" className="u-flex"
                                required />
                        </div>
                        {error && (
                            <div className="c-doctor-search__form-field-error-text">
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="c-doctor-search__form-field-row u-flexbox">
                <div className="c-doctor-search__form-field c-doctor-search__button u-flex-none u-margin-start-0">
                    <div className="c-doctor-search__form-field-inner">
                        <div className="c-doctor-search__form-field-input">
                            <div className="c-doctor-search__form-field-label" aria-hidden="true"></div>
                            <Button type="submit" className="pw--primary">Search Doctors</Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fake Doctor Search Results */}
            <List>
                {doctorSearchResults.map((item) => (
                    <ListTile
                        className="pw--instructional-block"
                        key={item._doctorKey}
                        endAction={
                            <Button 
                                className="pw--blank" 
                                icon="trash" 
                                onClick={() => handleDoctorSelectSubmit(item._doctorKey)} 
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

DoctorSearch.propTypes = {
    /**
     * Handler that is triggers when the form is submitted
     */
    onDoctorSelectSubmit: PropTypes.func
}

export default DoctorSearch
