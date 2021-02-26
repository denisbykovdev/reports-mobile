import React, { useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
// import {useState} from "reinspect"

export default function useSecureToken() {
    const [secureToken, setSecureToken] = useState();

    useEffect(() => {
        (async function getToken(){
            const token = await SecureStore.getItemAsync("userToken");
            console.log("*******SStoken:", token)
            setSecureToken(token);
        })()
        
    }, [])

    return secureToken;
}