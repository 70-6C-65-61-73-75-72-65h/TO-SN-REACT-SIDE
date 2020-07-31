export const requiredField = value => {
    if(value) return undefined;
    return "Field is required";
}


const maxLength = max => value => 
    value && value.length > max ? `Value must be no longer then ${max} symbols`: undefined;

    
export const maxLength10 = maxLength(10);
export const maxLength30 = maxLength(30);
export const maxLength50 = maxLength(50);
export const maxLength200 = maxLength(200);
export const maxLength1000 = maxLength(1000);