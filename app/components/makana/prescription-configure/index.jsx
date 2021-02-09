import React, { Fragment, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import Button from 'progressive-web-sdk/dist/components/button'
import List from 'progressive-web-sdk/dist/components/list'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'

const PRESCRIPTION_CONFIGURATION_FORM_NAME = 'prescription-configure'

const PrescriptionConfigure = (props) => {
    const { drugChoices, onPrescriptionConfigureSubmit } = props

    const handlePrescriptionSaveSubmit = (event) => {
        console.log('PrescriptionConfigure: handlePrescriptionSaveSubmit()')

        const formData = new FormData(event.target)
        if (onPrescriptionConfigureSubmit) onPrescriptionConfigureSubmit(formData)
    }

    return (
        <form
            id={PRESCRIPTION_CONFIGURATION_FORM_NAME}
            className="c-prescription-configure"
            data-analytics-name={PRESCRIPTION_CONFIGURATION_FORM_NAME}
            onSubmit={handlePrescriptionSaveSubmit}
        >
            <List>
                <ListTile className="c-prescription-configure__form-field-row u-flexbox">
                    <select name="drug" >
                        {drugChoices.variants.map((item, index) => (
                            <option key={index}>{item.name}</option>
                        ))}
                    </select>
                </ListTile>

                <ListTile className="c-prescription-configure__form-field-row u-flexbox">
                    <div>Form</div>
                    <select name="form">
                        {drugChoices.forms.map((item, index) => (
                            <option key={index}>{item}</option>
                        ))}
                    </select>
                </ListTile>

                <ListTile className="c-prescription-configure__form-field-row u-flexbox">
                    <div>Dosage</div>
                    <select name="dosage">
                        {drugChoices.dosages.map((item, index) => (
                            <option key={index}>{item}</option>
                        ))}
                    </select>
                </ListTile>

                <ListTile className="c-prescription-configure__form-field-row u-flexbox">
                    <div>Quantity</div>
                    <select name="quantity">
                        {drugChoices.quantities.map((item, index) => (
                            <option key={index}>{item}</option>
                        ))}
                    </select>
                </ListTile>
            </List>

            {/* Submit Button */}
            <div className="c-prescription-configure__form-field-row u-flexbox">
                <div className="c-prescription-configure__form-field c-prescription-configure__button u-flex-none u-margin-start-0">
                    <div className="c-prescription-configure__form-field-inner">
                        <div className="c-prescription-configure__form-field-input">
                            <div className="c-prescription-configure__form-field-label" aria-hidden="true"></div>
                            <Button type="submit" className="pw--primary">
                                Save Prescription
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

PrescriptionConfigure.propTypes = {
    /**
     * Handler that is triggers when the form is submitted
     */
    drugChoices: PropTypes.object,
    onPrescriptionConfigureSubmit: PropTypes.func
}

export default PrescriptionConfigure
