import React from 'react'
import PropTypes from 'prop-types'

import Button from 'progressive-web-sdk/dist/components/button'
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

class DoctorSearch extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = { value: '', error: null }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
        this.setState({ value: event.target.value })
    }

    handleSubmit(event) {
        const { onSubmit } = this.props
        const error = validate({ email: this.state.value }).email
        if (error) {
            event.preventDefault()
            this.setState({ error })
            analyticsManager.track('error', {
                name: 'doctorSearch_form',
                content: error
            })
            return
        }

        if (onSubmit) onSubmit()
    }

    render() {
        return (
            <form
                id={DOCTOR_SEARCH_FORM_NAME}
                className="c-doctor-search"
                data-analytics-name={DOCTOR_SEARCH_FORM_NAME}
                onSubmit={this.handleSubmit}
            >

                {/* Name */}
                <div className="c-doctor-search__form-field-row u-flexbox">
                    <div className={`c-doctor-search__form-field u-flex ${this.state.error ? 'c-doctor-search__form-field-error' : ''}`}>
                        <div className="c-doctor-search__form-field-inner">
                            <div className="c-doctor-search__form-field-label-wrap">
                                <label className="c-doctor-search__form-field-label" htmlFor="email">{'Name'}</label>
                            </div>
                            <div className="c-doctor-search__form-field-input">
                                <input id="name" type="email" data-analytics-name="email" className="u-flex"
                                    required onChange={this.handleChange} value={this.state.value} />
                            </div>
                            {this.state.error && (
                                <div className="c-doctor-search__form-field-error-text">
                                    {this.state.error}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* City */}
                <div className="c-doctor-search__form-field-row u-flexbox">
                    <div className={`c-doctor-search__form-field u-flex ${this.state.error ? 'c-doctor-search__form-field-error' : ''}`}>
                        <div className="c-doctor-search__form-field-inner">
                            <div className="c-doctor-search__form-field-label-wrap">
                                <label className="c-doctor-search__form-field-label" htmlFor="email">{'City'}</label>
                            </div>
                            <div className="c-doctor-search__form-field-input">
                                <input id="city" type="email" data-analytics-name="email" className="u-flex"
                                    required onChange={this.handleChange} value={this.state.value} />
                            </div>
                            {this.state.error && (
                                <div className="c-doctor-search__form-field-error-text">
                                    {this.state.error}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* State */}
                <div className="c-doctor-search__form-field-row u-flexbox">
                    <div className={`c-doctor-search__form-field u-flex ${this.state.error ? 'c-doctor-search__form-field-error' : ''}`}>
                        <div className="c-doctor-search__form-field-inner">
                            <div className="c-doctor-search__form-field-label-wrap">
                                <label className="c-doctor-search__form-field-label" htmlFor="email">{'State'}</label>
                            </div>
                            <div className="c-doctor-search__form-field-input">
                                <input id="state" type="email" data-analytics-name="email" className="u-flex"
                                    required onChange={this.handleChange} value={this.state.value} />
                            </div>
                            {this.state.error && (
                                <div className="c-doctor-search__form-field-error-text">
                                    {this.state.error}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Zip */}
                <div className="c-doctor-search__form-field-row u-flexbox">
                    <div className={`c-doctor-search__form-field u-flex ${this.state.error ? 'c-doctor-search__form-field-error' : ''}`}>
                        <div className="c-doctor-search__form-field-inner">
                            <div className="c-doctor-search__form-field-label-wrap">
                                <label className="c-doctor-search__form-field-label" htmlFor="email">{'Zip'}</label>
                            </div>
                            <div className="c-doctor-search__form-field-input">
                                <input id="zip" type="email" data-analytics-name="email" className="u-flex"
                                    required onChange={this.handleChange} value={this.state.value} />
                            </div>
                            {this.state.error && (
                                <div className="c-doctor-search__form-field-error-text">
                                    {this.state.error}
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

            </form>
        )
    }
}

DoctorSearch.propTypes = {
    /**
     * Handler that is triggers when the form is submitted
     */
    onSubmit: PropTypes.func
}

export default DoctorSearch
