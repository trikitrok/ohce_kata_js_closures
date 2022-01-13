import ohce from "./ohce";

describe("ohce", () => {
    let clock;
    let userInput
    let display;
    
    beforeEach(() => {
        clock = { hour: jest.fn() };
        userInput = { get: jest.fn() };
        display = { show: jest.fn() };
    });

    describe("stopping right after starting so it only greets the user", () => { 
        beforeEach(() => {
            userInput.get.mockReturnValueOnce("Stop!");
        });
        
        test.each([6, 7, 11])("during the morning at %p", (hour) => {
            clock.hour.mockReturnValue(hour);  
            
            ohce(clock, userInput, display).run("Pepe");
            
            expect(display.show.mock.calls).toEqual([
                ["¡Buenos días Pepe!"], 
                ["Adios Pepe"]
            ]);
            
        });
        
        test.each([12, 14, 19])("during the afternoon at %p", (hour) => {
            clock.hour.mockReturnValue(hour);  
    
            ohce(clock, userInput, display).run("Pepe");
            
            expect(display.show.mock.calls).toEqual([
                ["¡Buenas tardes Pepe!"], 
                ["Adios Pepe"]
            ]);
            
        });
        
        test.each([20, 22, 0, 5])("during the night at %p", (hour) => {
            clock.hour.mockReturnValue(hour);  
    
            ohce(clock, userInput, display).run("Pepe");
            
            expect(display.show.mock.calls).toEqual([
                ["¡Buenas noches Pepe!"], 
                ["Adios Pepe"]
            ]);
            
        });
    });
    
    describe("reversing a word", () => {
        test.each([["hola", "aloh"], ["koko", "okok"]])("like %p", (word, reversedWord) => { 
            clock.hour.mockReturnValue(7);
            userInput.get.mockReturnValueOnce(word).mockReturnValueOnce("Stop!");        
            
            ohce(clock, userInput, display).run("Juan");
            
            expect(display.show.mock.calls).toEqual([
                ["¡Buenos días Juan!"], 
                [reversedWord],
                ["Adios Juan"]
            ]);
        });
    });
    
    describe("finding a palindrome", () => {
        test.each(["oto", "ana"])("like %p", (palindrome) => { 
            clock.hour.mockReturnValue(7);
            userInput.get.mockReturnValueOnce(palindrome).mockReturnValueOnce( "Stop!");        
            
            ohce(clock, userInput, display).run("Juan");
            
            expect(display.show.mock.calls).toEqual([
                ["¡Buenos días Juan!"], 
                [palindrome],
                ["¡Bonita palabra!"],
                ["Adios Juan"]
            ]);
        });
    });
    
    describe("real scenario", () => {
        it("receiving several words", () => {
            clock.hour.mockReturnValue(7);
            userInput.get.mockReturnValueOnce("loko").mockReturnValueOnce("hannah").mockReturnValueOnce( "Stop!");        
            
            ohce(clock, userInput, display).run("Juan");
            
            expect(display.show.mock.calls).toEqual([
                ["¡Buenos días Juan!"], 
                ["okol"], 
                ["hannah"],
                ["¡Bonita palabra!"],
                ["Adios Juan"]
            ]);
        });
    });    
});

