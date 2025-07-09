import React from "react";



export const useFilteredArray = (initialArray, fn) => {
    
    return React.useMemo(()=>initialArray.filter(fn),[])
}