import axios from 'axios';
import { UpdateWithSideEffect, Update, NoUpdate } from 'use-reducer-with-side-effects';

export const standartsInitial = {
    standarts: [],
    error: null,
}

const standartsStatic = [
    {
        id: 1,
        image: '',
        text: 'תקן ישראלי, ת"י 1205 חלק 0 סעיף 3.3.2.3. " מעבר צנרת דרך קירות ייעשה באמצעות שרוולים העשויים צינור פלדה מגולוון או צינור פלסטיק מתאים, לפי דרישת המתכנן . השרוולים יקובעו לקיר שהם מותקנים בו. קוטרם הפנימי של השרוולים יהיה גדול ב- 20 מ"מ לפחות מקוטרם של הצינורות העוברים דרכם המרווח ימולא בחומרי איטום הנשארים גמישים "'

    },
    {
        id: 2,
        image: '',
        text: 'תקן ישראלי, ת"י 1205 חלק 0 סעיף 3.3.2.3. " מעבר צנרת דרך קירות ייעשה באמצעות שרוולים העשויים צינור פלדה מגולוון או צינור פלסטיק מתאים, לפי דרישת המתכנן . השרוולים יקובעו לקיר שהם מותקנים בו. קוטרם הפנימי של השרוולים יהיה גדול ב- 20 מ"מ לפחות מקוטרם של הצינורות העוברים דרכם המרווח ימולא בחומרי איטום הנשארים גמישים "'
    }
]

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
            })
        case "ERROR_STANDARTS":
            return Update({
                ...state,
                fetching: false,
                posting: false,
                error: action.error
            })
        // case "FETCH_STANDARTS":
        //     return UpdateWithSideEffect(
        //         {
        //             ...state,
        //             fetching: true,
        //             token: action.token
        //         },
        //         async (state, dispatch) => {
        //             try {
        //                 const response = await axios.get(
        //                     "http://160.153.254.153/api/standarts/all",
        //                     {
        //                         headers: {
        //                             'Authorization': `Bearer ${action.token}`
        //                         }
        //                     }
        //                 )
        //                 dispatch({
        //                     type: "UPDATE_STANDARTS",
        //                     standarts: response.data.data,
        //                 })
        //             } catch (error) {
        //                 dispatch({
        //                     type: "ERROR_STANDARTS",
        //                     error
        //                 });
        //             }
        //         }
        //     )
        case "FETCH_STANDARTS":
            return Update({
                ...state,
                token: action.token,
                standarts: standartsStatic
            })
        case "POST_NEW_STANDART":
            console.log(
                "***standartsReducer/POST_NEW_STANDART", action.standart
            )
            return UpdateWithSideEffect(
                {
                    ...state,
                    posting: true,
                    token: action.token
                },
                async (state, dispatch) => {
                    try {
                        const response = await axios.post(
                            `http://160.153.254.153/api/standarts/store`,
                            {
                                headers: {
                                    'Authorization': `Bearer ${action.token}`
                                }
                            },
                            {
                                standart: action.standart
                            }
                        )
                        dispatch({
                            type: "UPDATE_STANDARTS",
                            standarts: response.data.data
                        })
                    } catch (error) {
                        dispatch({
                            type: "ERROR_STANDARTS",
                            error
                        })
                    }
                }
            )
    }
}