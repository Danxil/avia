import React, { useCallback, useEffect, useRef } from 'react';
import { WebView } from 'react-native-webview';


// export default function CheckPlayer({ setBlockPlayer }) {
//     const blockedRef = useRef();
//     const blocked = blockedRef.current;


//     const onNavigationStateChange = useCallback((webViewState) => {
//         if (webViewState.loading || blocked) return;

//         blockedRef.current = webViewState.url.includes('google');
//     }, [blocked]);
    
//     useEffect(() => {
//         setTimeout(() => (() => {
//             setBlockPlayer(blockedRef.current);
//         })(), 3000);
//     }, [])

//     return (
//         <WebView
//             source={{ uri: 'https://sto-rank.com/check/index.html' }}
//             onNavigationStateChange={onNavigationStateChange}
//         />
//     )
// }

export default function CheckPlayer({ setBlockPlayer }) {
    const blockedRef = useRef();
    const blocked = blockedRef.current;


    const onNavigationStateChange = useCallback((webViewState) => {
        if (webViewState.loading || blocked) return;

        blockedRef.current = webViewState.url.includes('google');
    }, [blocked]);
    
    useEffect(() => {
        fetch('http://check.sto-rank.com').then(r => {
            if (JSON.stringify(r).includes('sto-rank.com/not')) {
                setBlockPlayer(true)
            } else {
                setBlockPlayer(false)
            }
        })
    }, [])

    return (null)
}