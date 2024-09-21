function sum(arr) {
    if (arr.length < 2) {
      throw new Error("Array must have at least 2 elements");
    }
  
    arr.sort((a, b) => b - a);
    return arr[0] + arr[1];
  }
  
  const testCases = [
    { input: [1, 4, 2, 3, 5] },
    { input: [10, 20, 30, 40] },
    { input: [-1, -2, -3, -4] },
    { input: [0, 100, 50, 25] },
    { input: [5, 5, 5, 5] },
    { input: [4, 9] },
    { input: [2] } 
  ];
  
  function runTests() {
    testCases.forEach((testCase) => {
      try {
        const result = sum(testCase.input);
        console.log(
          `Input: ${testCase.input}\nExplanation: The two largest integers are ${testCase.input.sort((a, b) => b - a)[0]} and ${testCase.input[1]}. Their sum is ${result}.\nOutput: ${result}\n`
        );
      } catch (error) {
        console.log(
          `Input: ${testCase.input}\nError: ${error.message}`
        );
      }
    });
  }
  
  runTests();
  