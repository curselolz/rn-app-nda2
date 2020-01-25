export const capitalizeString = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getFirstTwo = (string) => {
    let first = string[0]
    let second = string[1]
    return `${first}${second}`
}

export const getSecondTwo = (string) => {
    let first = string[3]
    let second = string[4]
    return `${first}${second}`
}

export const lastFour = (string) => {
    return `${string[6]}${string[7]}${string[8]}${string[9]}`
}

export const lastTwo = (string) => {
    return `${string[string.length -2]}${string[string.length -1]}`
}