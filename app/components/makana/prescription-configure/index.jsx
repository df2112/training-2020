import React, { Fragment, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import Button from 'progressive-web-sdk/dist/components/button'
import List from 'progressive-web-sdk/dist/components/list'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'
import Price from 'progressive-web-sdk/dist/components/price'

const PRESCRIPTION_CONFIGURATION_FORM1_NAME = 'prescription-configure-1'
const PRESCRIPTION_CONFIGURATION_FORM2_NAME = 'prescription-configure-2'
const PRESCRIPTION_CONFIGURATION_FORM3_NAME = 'prescription-configure-3'

const PrescriptionConfigure = (props) => {
    const { viewModel, onPrescriptionConfigureSubmit } = props
    const [processStep, setProcessStep] = useState(1)
    const [formData1, setFormData1] = useState()
    const [formData2, setFormData2] = useState()

    const handlePrescriptionSaveSubmit = (event) => {
        console.log('PrescriptionConfigure: handlePrescriptionSaveSubmit()')

        switch (processStep) {
            case 1:
                setFormData1(new FormData(event.target))
                event.preventDefault()
                setProcessStep(2)
                break
            case 2:
                setFormData2(new FormData(event.target))
                event.preventDefault()
                setProcessStep(3)
                break
            case 3:
                const formData3 = new FormData(event.target)

                for (var kv of formData1.entries()) {
                    formData3.set(kv[0], kv[1])
                }

                for (var kv of formData2.entries()) {
                    formData3.set(kv[0], kv[1])
                }

                if (onPrescriptionConfigureSubmit) onPrescriptionConfigureSubmit(formData3)
                break
        }
    }

    return (
        <div>
            {/* STEP 1 FORM - Configure Prescription */}
            <form
                style={processStep !== 1 ? { display: "none" } : {}}
                id={PRESCRIPTION_CONFIGURATION_FORM1_NAME}
                className="c-prescription-configure"
                data-analytics-name={PRESCRIPTION_CONFIGURATION_FORM1_NAME}
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

                    <div>
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
                </List>

                {/* Submit Button */}
                <div className="c-prescription-configure__form-field-row u-flexbox">
                    <div className="c-prescription-configure__form-field c-prescription-configure__button u-flex-none u-margin-start-0">
                        <div className="c-prescription-configure__form-field-inner">
                            <div className="c-prescription-configure__form-field-input">
                                <div className="c-prescription-configure__form-field-label" aria-hidden="true"></div>
                                <Button type="submit" className="pw--primary">
                                    Check Prices
                            </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            {/* STEP 2 MULTIPLE FORMS - Select Pharmacy */}
            <div style={processStep !== 2 ? { display: "none" } : {}}>
                <List>
                    {viewModel.pharmacies.map((item, index) => (
                        <form key={index} id={`${PRESCRIPTION_CONFIGURATION_FORM2_NAME} ${index}`}
                            className="c-prescription-configure"
                            data-analytics-name={PRESCRIPTION_CONFIGURATION_FORM2_NAME}
                            onSubmit={handlePrescriptionSaveSubmit}>

                            <ListTile
                                className="pw--instructional-block"
                                startAction={<img style={{ width: "30.8px", height: "30.8px", marginRight: "5px" }} src={item.pharmacyLogoUrl} />}
                                endAction={<Button type="submit" className="pw--success"><Price current={`$${item.pharmacyPrice}`} /></Button>}
                            >
                                <div>{item.pharmacyChain}</div>
                                <input name="pharmacy-chain" type="hidden" value={item.pharmacyChain} />

                                <div>{item.pharmacyCity}</div>
                                <input name="pharmacy-city" type="hidden" value={item.pharmacyCity} />
                            </ListTile>
                        </form>
                    ))}
                </List>
            </div>

            {/* STEP 3 MULTIPLE FORMS - Select Doctor */}
            <div style={processStep !== 3 ? { display: "none" } : {}}>
                <List>
                    {viewModel.doctors.map((item, index) => (                        
                        <form key={index} id={`${PRESCRIPTION_CONFIGURATION_FORM3_NAME} ${index}`}
                            className="c-prescription-configure"
                            data-analytics-name={PRESCRIPTION_CONFIGURATION_FORM3_NAME}
                            onSubmit={handlePrescriptionSaveSubmit}>

                            <ListTile
                                className="pw--instructional-block"
                                endAction={<Button type="submit" className="pw--success">Select</Button>}
                            >
                                <div>{item.name}</div>
                                <input id="doctor-name" name="doctor-name" type="text" value={item.name} readOnly />
                            </ListTile>
                        </form>
                    ))}
                </List>
            </div>
            
        </div >
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
