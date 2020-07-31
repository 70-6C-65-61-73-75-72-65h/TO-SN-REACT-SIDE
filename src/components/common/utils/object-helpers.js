export const updateObjectInArray = (itmes, itemId, objPropName, newObjProps) => {
    // debugger
    return itmes.map( item =>  {
        if (item[objPropName] === itemId) {
            return {...item, ...newObjProps}
        }
        return item;
    })  
}