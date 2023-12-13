/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * further hidden under the option "More Tools." In Firefox, they are
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    var result = {
        "SearchTerm": searchTerm,
        "Results": []
    };
    for (let i = 0; i < scannedTextObj.length; i++) {
        var isbn = scannedTextObj[i]["ISBN"];
        var content = scannedTextObj[i].Content;
        for(let i = 0; i < content.length; i++) {
            const text = content[i]["Text"].split(" ")
            if (text.includes(searchTerm)) {
                var page = content[i]["Page"];
                var line = content[i]["Line"];
                result["Results"].push({
                    "ISBN": `${isbn}`,
                    "Page": page,
                    "Line": line
                });
            }
        }
    }

    return result;
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]

/** input object containing multiple books. */
const multiBookInput = [
    {
        "Title": "Book1",
        "ISBN": "10000000000001",
        "Content": [
            {
                "Page": 11,
                "Line": 1,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 22,
                "Line": 2,
                "Text": "ness was then profound; and however good the Canadian\'s"
            }
        ]
    },
    {
            "Title": "Book2",
            "ISBN": "20000000000002",
            "Content": [
                {
                    "Page": 33,
                    "Line": 3,
                    "Text": "now simply went on by her own momentum.  The dark-"
                },
                {
                    "Page": 44,
                    "Line": 4,
                    "Text": "ness was then profound; and however good the Canadian\'s"
                }
            ]
        },
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

const darkSearch = {
    "SearchTerm": "dark",
    "Results": [
    ]
}

const canadiansSearch = {
    "SearchTerm": "Canadian's",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

const theUpperCase = {
    "SearchTerm": "The",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        }
    ]
}

const multiBookOutput = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "10000000000001",
            "Page": 22,
            "Line": 2
        },
        {
            "ISBN": "20000000000002",
            "Page": 44,
            "Line": 4
        },
    ]
}
/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn);
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

/** Test that a term not found in the search returns no results. */
const test3result = findSearchTermInBooks("not", twentyLeaguesIn);
if (test3result.Results.length == 0) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test3result.Results.length);
}

/** Test case-sensitivity */
const test4result = findSearchTermInBooks("The", twentyLeaguesIn);
if (test4result.Results.length == 1) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4");
    console.log("Expected:", theUpperCase.Results.length);
    console.log("Received:", test4result.Results.length);
}

const test5result = findSearchTermInBooks("The", twentyLeaguesIn);
if (JSON.stringify(theUpperCase) === JSON.stringify(test5result)) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected:", theUpperCase);
    console.log("Received:", test5result);
}

/** Test hyphened words */
const test6result = findSearchTermInBooks("dark", twentyLeaguesIn);
if (JSON.stringify(darkSearch) === JSON.stringify(test6result)) {
    console.log("PASS: Test 6");
} else {
    console.log("FAIL: Test 6");
    console.log("Expected:", darkSearch);
    console.log("Received:", test6result);
}

/** Test words with apostrophes */
const test7result = findSearchTermInBooks("Canadian's", twentyLeaguesIn);
if (JSON.stringify(canadiansSearch) === JSON.stringify(test7result)) {
    console.log("PASS: Test 7");
} else {
    console.log("FAIL: Test 7");
    console.log("Expected:", canadiansSearch);
    console.log("Received:", test7result);
}

/** Test multi-book input */
const test8result = findSearchTermInBooks("the", multiBookInput);
if (JSON.stringify(multiBookOutput) === JSON.stringify(test8result)) {
    console.log("PASS: Test 8");
} else {
    console.log("FAIL: Test 8");
    console.log("Expected:", multiBookOutput);
    console.log("Received:", test8result);
}

const test9result = findSearchTermInBooks("the", multiBookInput);
if (test9result.Results.length == 2) {
    console.log("PASS: Test 9");
} else {
    console.log("FAIL: Test 9");
    console.log("Expected:", multiBookOutput.Results.length);
    console.log("Received:", test9result.Results.length);
}
