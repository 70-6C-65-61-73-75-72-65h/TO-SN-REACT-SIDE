export const replaceQuotes = (string) => {
    string = JSON.parse(string.replace(/'/g, '"'));
    return string;
};