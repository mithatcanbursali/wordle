const letters = document.querySelectorAll(".word-box")
const container = document.querySelector(".word-box-container")
const loadingBar = document.querySelector(".loading")
const ANSWER_LENGHT = 5;
let win=0;
let lose=0;

let isLoading = true;





function loading(isLoading){ 
if(isLoading === true){
    loadingBar.classList.remove("hidden")
}

else if(isLoading === false){
    loadingBar.classList.add("hidden")
}
}


function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
  }

  function makeMap(array){
    const obj = {}
    for(let i = 0;i < array.length;i++){
        const letter = array[i];

        if(obj[letter]){
            obj[letter]++
        }

        else{
            obj[letter] = 1;
        }
    }
    
    return obj;
}




async function init(){

const res = await fetch("https://words.dev-apis.com/word-of-the-day?random=1");
const resObj = await res.json();
const answer = resObj.word.toUpperCase();
console.log(answer)
isLoading = false;
loading(isLoading);






        function checkCondition(){

            const map = makeMap(answer.split(""))

            for(let i = 0; i < ANSWER_LENGHT; i++){

            if(letters[(currentRow * ANSWER_LENGHT + i)].innerHTML === answer[i]){
                letters[(currentRow * ANSWER_LENGHT + i)].classList.add("true-word")
                map[letters[(currentRow * ANSWER_LENGHT + i)].innerHTML]--;

            }

        }

            for(let i = 0; i < ANSWER_LENGHT; i++){

                if(answer.includes(letters[(currentRow * ANSWER_LENGHT + i)].innerHTML)){
                
                if (letters[(currentRow * ANSWER_LENGHT + i)].innerHTML === answer[i]){
                    // do nothing
                }

                else if (map[letters[(currentRow * ANSWER_LENGHT + i)].innerHTML] > 0){
                    letters[(currentRow * ANSWER_LENGHT) + i].classList.add("true-but-wr")
                    map[letters[(currentRow * ANSWER_LENGHT + i)].innerHTML]--;
                }

                else{
                    letters[(currentRow * ANSWER_LENGHT) + i].classList.add("wrong")
                }

                }

                else{
                    letters[(currentRow * ANSWER_LENGHT) + i].classList.add("wrong")
                }





        }
    }



    async function commit() {
        if (currentGuess.length === ANSWER_LENGHT){ 
        
        isLoading = true;
        loading(isLoading);
        const resTwo = await fetch("https://words.dev-apis.com/validate-word",{
        method: "POST",
        body: JSON.stringify({word: currentGuess})

 });

 const ResTwoObj = await resTwo.json();
 isLoading = false;
 loading(isLoading)
 const {validWord} = ResTwoObj;

 if (!validWord){
    alert("INVALID WORD")
    return 1;
 }

            checkCondition();

            if(currentGuess.toUpperCase() === answer){
                alert("you win!")
                win = 1;
            }

            else if(currentRow === 5){
                alert(`you lose the word was ${answer}`)
                lose = 1;
            }   
            currentRow++;
            currentGuess = '';

        }
        
    }
    
    function backspace(){
        letters[(currentRow * ANSWER_LENGHT) + currentGuess.slice(0,-1).length].innerHTML = '';
        currentGuess = currentGuess.slice(0,-1);
    
    }

    
        let currentGuess = '';
        let currentRow= 0;



    document.addEventListener("keydown",function handleKeyEvent(event){
        const letter = event.key;
        const uppercasedLetter = letter.toUpperCase();

        if(win === 1 || lose === 1){
            return 1;
        }
    

        if (isLetter(letter) != true){
            // do nothing
        }


        else if(currentGuess.length < ANSWER_LENGHT){


                letters[(currentRow * ANSWER_LENGHT) + currentGuess.length].innerHTML = uppercasedLetter;
                currentGuess = currentGuess + letter;
            
        }

        

        else if(currentGuess.length === ANSWER_LENGHT){
            letters[(currentRow * ANSWER_LENGHT) + currentGuess.slice(0,-1).length].innerHTML = uppercasedLetter;
            currentGuess = currentGuess.slice(0,-1);
            currentGuess = currentGuess + letter;
        }
        

        if (letter === 'Enter'){
            commit();
        }

        if(letter === 'Backspace'){
            backspace();
        }

    


    })
    


}





 init();

