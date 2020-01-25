export const unmask = (str) => {
    return str.replace(/[+\s\(\)-]/g, '');
}

