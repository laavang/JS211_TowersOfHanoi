'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};
// the larger the number, the wider the ring



const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

const movePiece = (startStack, endStack) => {

  // removes last item from startStack, and saves it into "selectedPiece" variable
  let selectedPiece = stacks[startStack].pop();
  // adds selectedPiece variable onto end of endStack
  stacks[endStack].push(selectedPiece);
}

const isLegal = (startStack, endStack) => {

  // checks if user entered a, b, or c
  const legalInputs = ["a", "b", "c"];

  if ( legalInputs.includes(startStack) == false || 
       legalInputs.includes(endStack) == false )
  {
    return false;
  }

  // if piece is moving to empty stack, move is legal
  if ( stacks[endStack].length == 0)
    {
      return true;
    }
  // if piece is moving onto a larger piece, move is legal
  else if ( stacks[startStack].slice(-1) < stacks[endStack].slice(-1) )
    {
      return true;
    }
  else 
    {
      return false;
    }
  }

const checkForWin = () => {
    // check if there's a win – i.e. when stack b or c has 4 rings

    if (stacks.b.length === 4 || stacks.c.length === 4) 
    {
      console.log("************* You've won! *************");
      return true;
    }
    else 
    {
      return false;
    }
}


const towersOfHanoi = (startStack, endStack) => {
  
  if ( isLegal(startStack, endStack) == true )
  {
    movePiece(startStack, endStack);
  }
  else
  {
    console.log("Illegal move or entry.");
  }
  checkForWin();

}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}


// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = {
        a: [],
        b: [4, 3, 2, 1],
        c: []
      };;
      assert.equal(checkForWin(), true);
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}










