const stopwords = ['i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','but','if','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','only',
    'own','same','so','than','too','very','s','t','can','will','just','don','should','now']

const illegalChars = '~`!@#$%^&*()_-+={}|:"<>?[];,./1234567890'    

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

const removeStopWords = (string) => {
    let stringArr = string.split(" ")
    return stringArr.filter((ele) => !stopwords.includes(ele)).join(" ")
}

const removeIllegalChars = (string) => {
    let stringArr = []
    for(let x in string) {
        stringArr.push(string[x])
    }
    stringArr = stringArr.filter(ele => !illegalChars.includes(ele))
    return stringArr.join("")
} 

export const filterQuery = (string) => {
    string = string.toLowerCase()
    const noIlligalCharString = removeIllegalChars(string)
    const filteredQueryString = removeStopWords(noIlligalCharString)
    return filteredQueryString
}
