import React, { Fragment, useReducer } from 'react'
import PropTypes from 'prop-types'
import { getConnector, getFakeConnector } from '../../connector'

import GlobalState, { cartReducer } from '../global-state'
import MasterData from '../../data/makana/MasterData'

const fakeCart = getFakeConnector().getCart()

const getInitialCartState = (cart) => {

    const viewModel = cart.map((value, index) => {

        const drugMaster = MasterData.drugs.find(el => el.drugKey === value.drugKey)

        return {
            _gridRowKey: value._gridRowKey,

            doctor: MasterData.doctors.find(el => el.doctorKey === value.doctorKey),

            drug: {
                ...drugMaster,
                selectedDrugForm: value.selectedDrugForm,
                selectedDrugDosage: value.selectedDrugDosage,
                selectedDrugQuantity: value.selectedDrugQuantity,
                selectedVariantKey: value.variantKey,
                selectedVariantName: drugMaster.variants.find(el => el.variantKey === value.variantKey).variantName
            },

            pharmacy: MasterData.pharmacies.find(el => el.pharmacyKey === value.pharmacyKey)
        }
    })

    return viewModel
}

/**
 * Use the AppConfig component to inject extra arguments into the getProps
 * methods for all Route Components in the app – typically you'd want to do this
 * to inject a connector instance that can be used in all Pages.
 *
 * You can also use the AppConfig to configure a state-management library such
 * as Redux, or Mobx, if you like.
 */
const AppConfig = (props) => {

    const initialState = {
        cart: getInitialCartState(fakeCart)
    }

    const [state, dispatch] = useReducer(cartReducer, initialState)

    return (
        <GlobalState initialState={state} dispatch={dispatch}>
            <Fragment>{props.children}</Fragment>
        </GlobalState>
    )
}

AppConfig.restore = () => undefined

AppConfig.freeze = () => undefined

AppConfig.extraGetPropsArgs = () => {
    return {
        connector: getConnector(),
        fakeConnector: getFakeConnector()
    }
}

AppConfig.propTypes = {
    children: PropTypes.node
}

export default AppConfig
