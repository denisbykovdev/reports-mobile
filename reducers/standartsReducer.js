import axios from 'axios';
import { UpdateWithSideEffect, Update, NoUpdate } from 'use-reducer-with-side-effects';
import { createStandart, getAllStandarts, updateStandart } from '../constants/api';

export const standartsInitial = {
    standarts: [],
    error: null
};

const standartsStatic = [
    {
        id: 1,
        image: '',
        text: 'תקן ישראלי, ת"י 1205 חלק 0 סעיף 3.3.2.3. " מעבר צנרת דרך קירות ייעשה באמצעות שרוולים העשויים צינור פלדה מגולוון או צינור פלסטיק מתאים, לפי דרישת המתכנן . השרוולים יקובעו לקיר שהם מותקנים בו. קוטרם הפנימי של השרוולים יהיה גדול ב- 20 מ"מ לפחות מקוטרם של הצינורות העוברים דרכם המרווח ימולא בחומרי איטום הנשארים גמישים "',
        whatToDo: '',
        fault: '',
        profession: ''
    },
    {
        id: 2,
        image: '',
        text: 'תקן ישראלי, ת"י 1205 חלק 0 סעיף 3.3.2.3. " מעבר צנרת דרך קירות ייעשה באמצעות שרוולים העשויים צינור פלדה מגולוון או צינור פלסטיק מתאים, לפי דרישת המתכנן . השרוולים יקובעו לקיר שהם מותקנים בו. קוטרם הפנימי של השרוולים יהיה גדול ב- 20 מ"מ לפחות מקוטרם של הצינורות העוברים דרכם המרווח ימולא בחומרי איטום הנשארים גמישים "',
        whatToDo: '',
        fault: '',
        profession: ''
    }
];

export const standartsReducer = (
    state = standartsInitial,
    action
) => {
    switch (action.type) {
        case "UPDATE_STANDARTS":
            return Update({
                ...state,
                fetching: false,
                posting: false,
                standarts: action.standarts
            });
        case "ERROR_STANDARTS":
            return Update({
                ...state,
                fetching: false,
                posting: false,
                error: action.error
            });
        case "FETCH_STANDARTS":
            return UpdateWithSideEffect(
                {
                    ...state,
                    fetching: true,
                    token: action.token
                },
                async (state, dispatch) => {
                    try {
                        const response = await axios.get(
                            `${getAllStandarts}`,
                            {
                                headers: {
                                    'Authorization': `Bearer ${action.token}`
                                }
                            }
                        );
                        dispatch({
                            type: "UPDATE_STANDARTS",
                            standarts: response.data,
                        });
                    } catch (error) {
                        dispatch({
                            type: "ERROR_STANDARTS",
                            error
                        });
                    };
                }
            );
        case "POST_NEW_STANDART":
            // console.log(`***POST_NEW_STANDART/action:`, action.standart.text)
            return UpdateWithSideEffect(
                {
                    ...state,
                    posting: true,
                    token: action.token
                },
                async (state, dispatch) => {
                    try {
                        const response = await axios.post(
                            `${createStandart}`,
                            {
                                text: action.text,
                                image: action.image
                            },
                            {
                                headers: {
                                    'Authorization': `Bearer ${action.token}`
                                }
                            }
                        );
                        dispatch({
                            type: "UPDATE_STANDARTS",
                            standarts: [
                                ...state.standarts,
                                response.data.data
                            ]
                        });
                    } catch (error) {
                        dispatch({
                            type: "ERROR_STANDARTS",
                            error
                        });
                    };
                }
            );
        case "UPDATE_SAVED_STANDART":
            return UpdateWithSideEffect(
                {
                    ...state,
                    posting: true,
                    token: action.token
                },
                async (
                    state,
                    dispatch
                ) => {
                    try {
                        const response = await axios.post(
                            `${updateStandart(
                                action.standartId
                            )}`,
                            {
                                text: action.text,
                                image: action.image
                            },
                            {
                                headers: {
                                    'Authorization': `Bearer ${action.token}`
                                }
                            }
                        )
                        dispatch({
                            type: "UPDATE_STANDARTS",
                            standarts: [
                                ...state.standarts.map(
                                    standart =>
                                        standart.id ===
                                            response.data.data.id
                                            ? response.data.data
                                            : standart
                                )
                            ]
                        });
                    } catch (error) {
                        dispatch({
                            type: "ERROR_STANDARTS",
                            error
                        });
                    };
                }
            );
    };
};