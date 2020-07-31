const backupQuotes = (string) => {
    // obj = JSON.parse(obj.replace(/'/g, '"'));
    string = JSON.stringify(string).replace(/"/g, '\'')
    // debugger
    return string;
}
export default backupQuotes;