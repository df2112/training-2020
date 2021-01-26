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
    const { onSubmit } = props
    const [error, setError] = useState(false)
    const [emailValue, setEmailValue] = useState('')
    const [doctorSearchResults, setDoctorSearchResults] = useState([])

    const handleEmailChange = (event) => setEmailValue(event.target.value)

    const handleSubmit = (event) => {
        console.log('DoctorSearch: handleSubmit()')        
        const validationError = validate({ email: emailValue }).email

        if (validationError) {
            event.preventDefault()
            setError(validationError)
            analyticsManager.track('error', {
                name: 'doctorSearch_form',
                content: error
            })
            return
        }

        event.preventDefault() //TODO: This needs to be reviewed
        setDoctorSearchResults(fakeDoctors)
        //if (onSubmit) onSubmit()
    }

    return (
        <form
            id={DOCTOR_SEARCH_FORM_NAME}
            className="c-doctor-search"
            data-analytics-name={DOCTOR_SEARCH_FORM_NAME}
            onSubmit={handleSubmit}
        >

            {/* Name */}
            <div className="c-doctor-search__form-field-row u-flexbox">
                <div className={`c-doctor-search__form-field u-flex ${error ? 'c-doctor-search__form-field-error' : ''}`}>
                    <div className="c-doctor-search__form-field-inner">
                        <div className="c-doctor-search__form-field-label-wrap">
                            <label className="c-doctor-search__form-field-label" htmlFor="email">{'Name'}</label>
                        </div>
                        <div className="c-doctor-search__form-field-input">
                            <input id="name" type="email" data-analytics-name="email" className="u-flex"
                                required onChange={handleEmailChange} value={emailValue} />
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
                            <label className="c-doctor-search__form-field-label" htmlFor="email">{'City'}</label>
                        </div>
                        <div className="c-doctor-search__form-field-input">
                            <input id="city" type="email" data-analytics-name="email" className="u-flex"
                                required onChange={handleEmailChange} value={emailValue} />
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
                            <label className="c-doctor-search__form-field-label" htmlFor="email">{'State'}</label>
                        </div>
                        <div className="c-doctor-search__form-field-input">
                            <input id="state" type="email" data-analytics-name="email" className="u-flex"
                                required onChange={handleEmailChange} value={emailValue} />
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
                            <label className="c-doctor-search__form-field-label" htmlFor="email">{'Zip'}</label>
                        </div>
                        <div className="c-doctor-search__form-field-input">
                            <input id="zip" type="email" data-analytics-name="email" className="u-flex"
                                required onChange={handleEmailChange} value={emailValue} />
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
                        endAction={<Button className="pw--blank" icon="trash" onClick={() => console.log('Yo!')} />}
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
    onSubmit: PropTypes.func
}

export default DoctorSearch
