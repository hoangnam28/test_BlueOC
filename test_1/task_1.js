function strLengths(arr) {
    const lengthFrequency = new Map();

    arr.forEach(str => {
        const len = str.length;
        lengthFrequency.set(len, (lengthFrequency.get(len) || 0) + 1);
    });

    const maxFrequency = Math.max(...lengthFrequency.values());

    const mostFrequentLengths = [];
    lengthFrequency.forEach((value, key) => {
        if (value === maxFrequency) {
            mostFrequentLengths.push(key);
        }
    });

   
    return arr.filter(str => mostFrequentLengths.includes(str.length));
}

function runTests() {
    console.assert(JSON.stringify(strLengths(['a', 'ab', 'abc', 'cd', 'def', 'gh']).sort()) === JSON.stringify(['ab', 'cd', 'gh'].sort()), 'Test Case 1 Failed');
    console.assert(JSON.stringify(strLengths(['hello', 'hi', 'world', 'yes', 'no', 'yes']).sort()) === JSON.stringify(['hi', 'no', 'yes'].sort()), 'Test Case 2 not have most frequent lengths');
    console.assert(JSON.stringify(strLengths(['a', 'aa', 'aaa', 'aaaa', 'bb', 'ccc', 'kkk']).sort()) === JSON.stringify(['aaa', 'ccc', 'kkk'].sort()), 'Test Case 3 Failed');
    
    
}

runTests();
