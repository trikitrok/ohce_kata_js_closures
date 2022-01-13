export default (clock, userInput, display) => {
    return {
        run: (userName) => {
            greetUser(userName);
            
            while(true) {
                const word = getWord();

                if(isStop(word)) {    
                    sayBye(userName);
                    return;
                }
                 
                process(word);      
            }
            
            function isStop(word) {
                return word === "Stop!"
            }
            
            function getWord() {
                return userInput.get();
            }
        }
    };
  
    function sayBye(userName) {
        display.show(`Adios ${userName}`);
    }
    
    function process(word) {
        display.show(reversedWord());
        
        if(wordIsPalindrome()) {
            celebratePalindrome();
        }       
        
        function reversedWord() {
            return word.split("").reverse().join("");
        }
  
        function wordIsPalindrome() {
            return word === reversedWord();
        } 
        
        function celebratePalindrome() {
            display.show("¡Bonita palabra!")
        }
    }
  
    function greetUser(userName) {
        display.show(greetingMessage(clock.hour()));
        
        function greeting(hour) {
            if(hour >= 6 && hour < 12) {
                return "Buenos días";
            }

            if(hour >= 12 && hour < 20) {
                return "Buenas tardes"
            }

            return "Buenas noches";
        }

        function greetingMessage(hour) {
            return `¡${greeting(hour)} ${userName}!`;
        }
    }  
}
