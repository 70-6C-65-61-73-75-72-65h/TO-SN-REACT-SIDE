import { useState } from 'react';
export const useForbidUnsafeMethods = () => {
    const [exchangeNotSafeMethods, setExchangeNotSafeMethods] = useState(false)
    const [shown, setShown] = useState(false)

    const reduceMethods = (method, isReduced=null) => (isReduced!==null ? !isReduced : exchangeNotSafeMethods) ? ()=>{} : method

    return [exchangeNotSafeMethods, setExchangeNotSafeMethods, shown, setShown, reduceMethods]
}