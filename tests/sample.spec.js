const {test} = require('@playwright/test')

test("sample", async ({page})=>{
    const result = {};
   let str = 'abcabcaa';
   for(let char of str){
    result[char] = (result[char] || 0) + 1;
   }
console.log(result);

let str1 = "AAxyzBBa";
let flag = 0;
for (let i = 0; i <= str1.length - 3; i++) {
    if (str1.substring(i, i + 3) === "xyz") {
      const left = i;
      const right = str1.length - (i + 3);

      console.log(`left : ${left} and right : ${right}`);
      console.log(Math.abs(left - right));
      
      if (Math.abs(left - right) == 0) {
        console.log('true');
        flag = 1;
      }
    }
  }
  if(flag == 0)
  console.log('false');

})
