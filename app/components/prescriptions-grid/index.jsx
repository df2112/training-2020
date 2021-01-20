import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Button from 'progressive-web-sdk/dist/components/button'
import { getAnalyticsManager } from '../../analytics'

const analyticsManager = getAnalyticsManager()
const EMAIL_SUBSCRIBE_FORM_NAME = 'email-subscribe'

export const validate = (values) => {
    const errors = {}
    if ((values.email || '').search(/@mobify.com$/) < 0) {
        errors.email = 'Must be a @mobify.com email address'
    }
    return errors
}

const PrescriptionsGrid = (props) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState(false)

    const handleChange = (event) => setValue(event.target.value)

    const handleSubmit = (event) => {
        const { onSubmit } = props
        const emailError = validate({ email: value }).email

        if (emailError) {
            event.preventDefault()
            setError(emailError)
            analyticsManager.track('error', {
                name: 'PrescriptionsGrid_form',
                content: emailError
            })
            return
        }

        if (onSubmit) onSubmit()
    }

    return (
        <div>
            <form id={EMAIL_SUBSCRIBE_FORM_NAME}
                className="c-email-subscribe"
                data-analytics-name={EMAIL_SUBSCRIBE_FORM_NAME}
                onSubmit={handleSubmit}>

                {/* Email address row */}
                <div className="c-email-subscribe__form-field-row u-flexbox">
                    <div className={`c-email-subscribe__form-field u-flex ${error ? 'c-email-subscribe__form-field-error' : ''}`}>
                        <div className="c-email-subscribe__form-field-inner">
                            <div className="c-email-subscribe__form-field-label-wrap">
                                <label className="c-email-subscribe__form-field-label" htmlFor="email">{'Email Address'}</label>
                            </div>
                            <div className="c-email-subscribe__form-field-input">
                                <input id="email" type="email" data-analytics-name="email" className="u-flex" 
                                    required onChange={handleChange} value={value}/>
                            </div>
                            {error && (
                                <div className="c-email-subscribe__form-field-error-text">
                                    {error}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="c-email-subscribe__form-field c-email-subscribe__button u-flex-none u-margin-start-0">
                        <div className="c-email-subscribe__form-field-inner">
                            <div className="c-email-subscribe__form-field-input">
                                <div className="c-email-subscribe__form-field-label" aria-hidden="true">{'Email Address'}</div>
                                <Button type="submit" className="pw--primary">Submit</Button>
                            </div>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    )
}

PrescriptionsGrid.propTypes = {
    /**
     * Handler that is triggers when the form is submitted
     */
    onSubmit: PropTypes.func
}

export default PrescriptionsGrid
