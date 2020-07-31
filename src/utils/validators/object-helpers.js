export const updateObjectInArray = (itmes, itemId, objPropName, newObjProps) => {
    return itmes.map( item =>  {
        if (item[objPropName] === itemId) {
            return {...item, ...newObjProps}
        }
        return item;
    })  
}