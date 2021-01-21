import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'

import Button from 'progressive-web-sdk/dist/components/button'
import { HeaderBar, HeaderBarActions, HeaderBarTitle } from 'progressive-web-sdk/dist/components/header-bar'
import List from 'progressive-web-sdk/dist/components/list'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'
import Sheet from 'progressive-web-sdk/dist/components/sheet'
import { getAnalyticsManager } from '../../analytics'
import { Desktop, Mobile, Tablet } from '../../components/media-queries'

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
    const { analyticsManager, doctors, listItems } = props

    const [emailValue, setEmailValue] = useState('')
    const [error, setError] = useState(false)
    const [isShippingSheetOpen, setIsShippingSheetOpen] = useState(false)
    const [selectedDoctor, setSelectedDoctor] = useState('999')

    const handleDoctorChange = (event) => setSelectedDoctor(event.target.value)

    const handleEmailChange = (event) => setEmailValue(event.target.value)

    const handleSubmit = (event) => {
        const { onSubmit } = props
        const emailError = validate({ email: emailValue }).email

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

    const ShippingDeliveryModal = ({ width }) => (
        <Sheet
            className="pw--no-shadow t-product-details__shipping-delivery-info-modal"
            coverage={width}
            open={isShippingSheetOpen}
            effect="modal-center"
            shrinkToContent
            headerContent={
                <HeaderBar>
                    <HeaderBarTitle className="u-flex u-padding-start-md u-text-align-start u-text-size-big">
                        Shipping & Delivery Info
                    </HeaderBarTitle>

                    <HeaderBarActions>
                        <Button innerClassName="u-padding-0" icon="close"
                            onClick={() => setIsShippingSheetOpen(!isShippingSheetOpen)}
                        />
                    </HeaderBarActions>
                </HeaderBar>
            }
        >
            <div className="t-product-details__shipping-delivery-modal-content">
                <span>
                    Receive free Standard Shipping within Canada for purchases of $150+,
                    excluding taxes, when signed into a Mobify.com account.
                </span>
            </div>
        </Sheet>
    )

    return (
        <div>
            <div className="u-margin-bottom-lg">
                This is the Prescriptions Grid component:
            </div>

            <List>
                {/* Row 1: Email address */}
                <ListTile className="pw--instructional-block">
                    <form id={EMAIL_SUBSCRIBE_FORM_NAME}
                        className="c-email-subscribe"
                        data-analytics-name={EMAIL_SUBSCRIBE_FORM_NAME}
                        onSubmit={handleSubmit}>

                        <div className="c-email-subscribe__form-field-row u-flexbox">
                            <div className={`c-email-subscribe__form-field u-flex ${error ? 'c-email-subscribe__form-field-error' : ''}`}>
                                <div className="c-email-subscribe__form-field-inner">
                                    <div className="c-email-subscribe__form-field-label-wrap">
                                        <label className="c-email-subscribe__form-field-label" htmlFor="email">{'Email Address'}</label>
                                    </div>
                                    <div className="c-email-subscribe__form-field-input">
                                        <input id="email" type="email" data-analytics-name="email" className="u-flex"
                                            required onChange={handleEmailChange} value={emailValue} />
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
                </ListTile>

                {/* Row 2: Modal button */}
                <ListTile className="pw--instructional-block">
                    <div className="u-margin-bottom-lg">
                        Set up a modal with with example:
                    </div>

                    <Button className="t-product-details__modal-button pw--primary qa-modal-button"
                        onClick={() => setIsShippingSheetOpen(!isShippingSheetOpen)}>
                        Modal Button
                    </Button>
                </ListTile>

                {/* Row 3+: Dynamic items */}
                {listItems.map((item) => (
                    <ListTile className="pw--instructional-block"
                        key={item.field2} 
                        startAction={<Button className="pw--blank" icon="user" />}
                        endAction={<Button className="pw--blank" icon="chevron-right" />}
                    >
                        <div>
                            {item.field2} : {item.field1}
                        </div>

                        <select value={selectedDoctor} onChange={handleDoctorChange}>
                            {doctors && doctors.length > 0 && doctors.map((doctor) => (
                                <Fragment key={doctor._doctorKey}>
                                    <option value={doctor._doctorKey}>{doctor.name}</option>
                                </Fragment>
                            ))}
                        </select>
                    </ListTile>
                ))}
            </List>

            {/* Floating element/components */}
            <Mobile>
                <ShippingDeliveryModal width="80%" />
            </Mobile>

            <Tablet>
                <ShippingDeliveryModal width="60%" />
            </Tablet>

            <Desktop>
                <ShippingDeliveryModal width="40%" />
            </Desktop>
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
