'use strict'

export default function GlobalReducer(state = {}, action) {

    const { type, payload } = action

    switch (type) {

        case "SET_LOADING": {
            return { ...state, loading: payload }
        }

        case "SET_EDIT_MODE": {
            return { ...state, editMode: payload }
        }

        default: {
            return state
        }

    }
}