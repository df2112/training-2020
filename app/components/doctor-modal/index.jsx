import React, { Fragment, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import Button from 'progressive-web-sdk/dist/components/button'
import { HeaderBar, HeaderBarActions, HeaderBarTitle } from 'progressive-web-sdk/dist/components/header-bar'
import List from 'progressive-web-sdk/dist/components/list'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'
import Sheet from 'progressive-web-sdk/dist/components/sheet'
import { Tabs, TabsPanel } from 'progressive-web-sdk/dist/components/tabs'
import DoctorAddNew from '../doctor-add-new'
import DoctorSearch from '../doctor-search'

const DoctorModal = (props) => {
    const { analyticsManager, isDoctorModalOpen, width } = props

    //const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false)
    const [isDoctorSearchSubmitted, setisDoctorSearchSubmitted] = useState(false)
    const [isDoctorSelectSubmitted, setisDoctorSelectSubmitted] = useState(false)

    const handleDoctorSearchSubmit = (event) => {
        console.log('handleDoctorSearchSubmit()')
        setisDoctorSearchSubmitted(true)
    }

    const handleDoctorSelectSubmit = (event) => {
        console.log('handleDoctorSelectSubmit()')
        setisDoctorSelectSubmitted(true)
    }

    return (
        <div>
            <Sheet
                className="pw--no-shadow t-product-details__shipping-delivery-info-modal"
                coverage={width}
                open={isDoctorModalOpen}
                effect="modal-center"
                shrinkToContent
                headerContent={
                    <HeaderBar>
                        <HeaderBarTitle className="u-flex u-padding-start-md u-text-align-start u-text-size-big">Add Doctor</HeaderBarTitle>

                        <HeaderBarActions>
                            <Button innerClassName="u-padding-0" icon="close"
                                onClick={() => setIsDoctorModalOpen(!isDoctorModalOpen)}
                            />
                        </HeaderBarActions>
                    </HeaderBar>
                }
            >
                <div className="t-product-details__shipping-delivery-modal-content">
                    <Tabs activeIndex={0}>
                        <TabsPanel title="Search Doctors">
                            <br />

                            {!isDoctorSearchSubmitted ? (
                                <DoctorSearch analyticsManager={analyticsManager} onSubmit={handleDoctorSearchSubmit} />
                            ) : (<span>Hello Dave!</span>)
                            }

                        </TabsPanel>
                        <TabsPanel title="Add New Doctor">
                            <br />

                            {!isDoctorSelectSubmitted ? (
                                <DoctorAddNew analyticsManager={analyticsManager} onSubmit={handleDoctorSelectSubmit} />
                            ) : (<span>Hello Dave!</span>)
                            }

                        </TabsPanel>
                    </Tabs>
                </div>
            </Sheet>

        </div>
    )
}

DoctorModal.propTypes = {
    /**
     * Handler that is triggers when the form is submitted
     */
    onSubmit: PropTypes.func
}

export default DoctorModal
