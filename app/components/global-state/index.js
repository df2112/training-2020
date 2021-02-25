import React from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from 'uuid'

import MasterData from '../../data/makana/MasterData'

// Set up global contexts
export const GlobalStateContext = React.createContext();
export const GlobalDispatchContext = React.createContext();

// Actions
export const SET_CART_ITEMS = "SET_CART_ITEMS";

// Reducer
export const cartReducer = (state, action) => {

    switch (action.type) {

        case 'ADD_ITEM':
            console.log('Global State - cartReducer: ADD_ITEM')
            console.log('--- formData parameter =>')
            console.log(Object.fromEntries(action.formData.entries()))

            const newGridRow = {
                _gridRowKey: uuidv4(),
                doctor: MasterData.doctors.find(el => el.doctorKey === action.formData.get('doctor-key')),
                drug: {
                    ...MasterData.drugs.find(el => el.drugKey === action.formData.get('drug-key')),
                    selectedDrugForm: action.formData.get('selected-drug-form'),
                    selectedDrugDosage: action.formData.get('selected-drug-dosage'),
                    selectedDrugQuantity: action.formData.get('selected-drug-quantity'),
                    //  BIG TODO FIX THIS
                    // selectedVariantKey: value.variantKey,
                    selectedVariantName: action.formData.get('selected-variant-name')
                },
                pharmacy: MasterData.pharmacies.find(el => el.pharmacyKey === action.formData.get('pharmacy-key')),
            }

            return {
                ...state,
                cart: state.cart.concat(newGridRow)
            }

        case 'EDIT_ITEM':
            console.log('Global State - cartReducer: EDIT_ITEM')
            console.log('--- formData parameter =>')
            console.log(Object.fromEntries(action.formData.entries()))

            const newList = state.cart.map((item) => {
                if (item._gridRowKey === action.formData.get('grid-row-key')) {
                    const updatedItem = {
                        ...item,
                        doctor: MasterData.doctors.find(el => el.doctorKey === action.formData.get('doctor-key')),
                        drug: {
                            ...MasterData.drugs.find(el => el.drugKey === action.formData.get('drug-key')),
                            selectedDrugForm: action.formData.get('selected-drug-form'),
                            selectedDrugDosage: action.formData.get('selected-drug-dosage'),
                            selectedDrugQuantity: action.formData.get('selected-drug-quantity'),
                            //  BIG TODO FIX THIS
                            // selectedVariantKey: value.variantKey,
                            selectedVariantName: action.formData.get('selected-variant-name')
                        },
                        pharmacy: MasterData.pharmacies.find(el => el.pharmacyKey === action.formData.get('pharmacy-key'))
                    }
                    return updatedItem
                } else {
                    return item
                }
            })

            return {
                ...state,
                cart: newList
            }

        case 'REMOVE_ITEM':
            console.log('Global State - cartReducer: REMOVE_ITEM')

            return {
                ...state,
                cart: state.cart.filter((item) => item._gridRowKey !== action.id)
            }

        default:
            throw new Error();
    }

};

function GlobalState(props) {
    const { initialState, dispatch } = props;

    return (
        <GlobalStateContext.Provider value={initialState}>
            <GlobalDispatchContext.Provider value={dispatch}>
                {props.children}
            </GlobalDispatchContext.Provider>
        </GlobalStateContext.Provider>
    );
}

GlobalState.propTypes = {
    initialState: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.node
};

export default GlobalState;