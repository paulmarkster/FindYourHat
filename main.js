const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this.field = field;
        this.row = 0;
        this.col = 0;
    }

    print() {
        for (let i=0; i < this.field.length; i++) {
            console.log(this.field[i].join(''));
        }
    }

    getNewPosition() {
        let key = prompt('Enter a travel direction (u/d/l/r): ');
        switch (key) {
            case key = 'u':
                this.row -= 1;
                break;
            case key = 'd':
                this.row += 1;
                break;
            case key = 'l':
                this.col -= 1;
                break;
            case key = 'r':
                this.col += 1;
                break;
            default:
                console.log('Invalid input. Try again.');
        }    
    }    

    processNewPosition() {
        let gameActive = true;
        if (this.row < 0 || this.col < 0 || this.row === this.field.length || this.col === this.field[0].length) {
            console.log('You lose: You went out of bounds.');
            gameActive = false;
        } else if (this.field[this.row][this.col] === hole) {
            console.log('You lose: You fell into a hole.');
            gameActive = false;
        } else if (this.field[this.row][this.col] === hat) {
            console.log('You win: You found the hat!');
            gameActive = false;
        }
        if (gameActive) {
            this.field[this.row][this.col] = pathCharacter;
        }
        return gameActive;
    }

    static generateField() {
        let height = prompt('Enter height of playing field: ');
        let numHeight = Number(height);
        let width = prompt('Enter width of playing field: ');
        let numWidth = Number(width);
        let holePercentage = prompt('Enter percentage of holes to total grid elements: ')
        let numHolePercentage = Number(holePercentage)/100;
        
        // Define array and initially set all elements as field character.
        let my2DArray = Array(numHeight).fill().map(() => {
            return Array(numWidth).fill(fieldCharacter);
        });

        // Load maximum number of holes into field.
        // Note there is a possibility of losing one or two of them when adding initial path and hat.
        for (let i=0; i <= numHeight * numWidth * numHolePercentage; i++) {
            my2DArray[Math.floor(Math.random() * numHeight)]
                     [Math.floor(Math.random() * numWidth)] = hole;
        }

        // Set initial path at top left.
        my2DArray[0][0] = pathCharacter;

        // Put hat in bottom right quadrant to make the game last longer.
        my2DArray[Math.floor(Math.random() * Math.floor(numHeight/2) + Math.floor(numHeight/2))]
                 [Math.floor(Math.random() * Math.floor(numWidth/2) + Math.floor(numWidth/2))] = hat;

        return my2DArray;
    }
}

const myField = new Field(Field.generateField());
let gameOngoing = true;
while (gameOngoing) {
    myField.print();
    myField.getNewPosition();
    gameOngoing = myField.processNewPosition();
};
