import React, { Fragment, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import Button from 'progressive-web-sdk/dist/components/button'
import List from 'progressive-web-sdk/dist/components/list'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'

const PRESCRIPTION_CONFIGURATION_FORM_NAME = 'prescription-configure'

const PrescriptionConfigure = (props) => {
    const { viewModel, onPrescriptionConfigureSubmit } = props
    const [processStep, setProcessStep] = useState(1)

    const handlePrescriptionSaveSubmit = (event) => {
        console.log('PrescriptionConfigure: handlePrescriptionSaveSubmit()')

        switch (processStep) {
            case 1:
                event.preventDefault()
                setProcessStep(2)
                break
            case 2:
                event.preventDefault()
                setProcessStep(3)
                break
            case 3:
                const formData = new FormData(event.target)
                if (onPrescriptionConfigureSubmit) onPrescriptionConfigureSubmit(formData)
                break
        }
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
                        {viewModel.variants.map((item, index) => (
                            <option key={index}>{item.name}</option>
                        ))}
                    </select>
                </ListTile>

                <div style={processStep !== 1 ? { display: "none" } : {}}>
                    <ListTile className="c-prescription-configure__form-field-row u-flexbox">
                        <div>Form</div>
                        <select name="form">
                            {viewModel.forms.map((item, index) => (
                                <option key={index}>{item}</option>
                            ))}
                        </select>
                    </ListTile>

                    <ListTile className="c-prescription-configure__form-field-row u-flexbox">
                        <div>Dosage</div>
                        <select name="dosage">
                            {viewModel.dosages.map((item, index) => (
                                <option key={index}>{item}</option>
                            ))}
                        </select>
                    </ListTile>

                    <ListTile className="c-prescription-configure__form-field-row u-flexbox">
                        <div>Quantity</div>
                        <select name="quantity">
                            {viewModel.quantities.map((item, index) => (
                                <option key={index}>{item}</option>
                            ))}
                        </select>
                    </ListTile>
                </div>

                <div style={processStep !== 2 ? { display: "none" } : {}}>
                    {viewModel.pharmacies.map((item, index) => (
                        <ListTile key={index}
                            startAction={<img style={{ width: "30.8px", height: "30.8px", marginRight: "5px" }} src={item.pharmacyLogoUrl} />}
                            endAction={<Button type="submit" className="pw--success">{item.pharmacyPrice}</Button>}
                        >
                            <div>{item.pharmacyChain}</div>
                            <div>{item.pharmacyCity}</div>
                        </ListTile>
                    ))}
                </div>

                <div style={processStep !== 3 ? { display: "none" } : {}}>
                    <div>Step 3</div>
                </div>
            </List>

            {/* Submit Button */}
            <div style={processStep === 2 ? { display: "none" } : {}} className="c-prescription-configure__form-field-row u-flexbox">
                <div className="c-prescription-configure__form-field c-prescription-configure__button u-flex-none u-margin-start-0">
                    <div className="c-prescription-configure__form-field-inner">
                        <div className="c-prescription-configure__form-field-input">
                            <div className="c-prescription-configure__form-field-label" aria-hidden="true"></div>
                            <Button type="submit" className="pw--primary">
                                {processStep === 1 ? 'Check Prices' : 'Save Prescription'}                                
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
    viewModel: PropTypes.object,
    onPrescriptionConfigureSubmit: PropTypes.func
}

export default PrescriptionConfigure
