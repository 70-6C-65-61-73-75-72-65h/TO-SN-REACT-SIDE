const replaceQuotes = (string) => {
    // debugger
    string = JSON.parse(string.replace(/'/g, '"'));
    return string;
};
export default replaceQuotes