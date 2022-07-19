export const selectRequestAPI = (value) =>  {
    const valueArray = value.split(" ")
    const valueArrayLowerCase = valueArray.map(val => val.toLowerCase())

    if(valueArrayLowerCase.includes("and")) {
        return "-AND"
    } else if(valueArrayLowerCase.includes("or")) {
        return "-OR"
    } else if(valueArrayLowerCase.includes("not")) {
        return "-NOT"
    } else {
        return ""
    }
}

export const parseData = (string, endpoint) => {
    const string1 = string.toLowerCase()
    let stringArray = null
    
    switch(endpoint) {
        case "-AND":
            stringArray = string1.split(" and ")
            return { queryString1: stringArray[0], queryString2: stringArray[1] }
        case "-OR":
            stringArray = string1.split(" or ")
            return { queryString1: stringArray[0], queryString2: stringArray[1] }
        case "-NOT":
            stringArray = string1.split("not ")
            return { queryString: stringArray[1] }
        default:
            return { queryString: string1 }
    }
}

