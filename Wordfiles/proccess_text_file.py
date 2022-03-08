import json
nameOfTxt = 'sgb-6-letter-words'
nameOfJSON = '6-letter'

def readLines(filename):
    input_file = open(filename, "r")
    string_input = input_file.read()
    list_input = string_input.split("\n")
    input_file.close()
    return list_input

def sortWords():
    sortedDict = {'A': [], 'B': [], 'C': [], 'D': [], 'E': [], 'F': [], 
    'G': [], 'H': [], 'I': [], 'J': [], 'K': [], 'L': [], 'M': [], 
    'N': [], 'O': [], 'P': [], 'Q': [], 'R': [], 'S': [], 'T': [], 
    'U': [], 'V': [], 'W': [], 'X': [], 'Y': [], 'Z': []}
    rawList = readLines("Wordfiles/RawTXT/" + nameOfTxt + ".txt")
    for word in rawList:
        sortedDict[word[0].upper()].append(word)

    return sortedDict

def writeToJSON():
    sortedDict = sortWords()
    with open(nameOfJSON +'.json', 'w') as outfile:
        json.dump(sortedDict, outfile)

writeToJSON()