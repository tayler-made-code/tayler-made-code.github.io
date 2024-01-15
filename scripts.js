// Global Variables ==========================================================
// ===========================================================================
const userInput = document.querySelector('.userInput');
const inputButton = document.querySelector('#nomNomNom');
const resetButton = document.querySelector('#resetText');
const clearButton = document.querySelector('#clearText');
const btnContainer = document.querySelector('.btnContainer');
const modalBtn = document.querySelector('.modalButton');
const modal = document.querySelector('.modal');
const getCopyBtn = document.querySelector('#modalCopy');
const modalPlayBtn = document.querySelector('#modalPlay');
const modalTitle = document.querySelector('#modalTitle');
const modalBody = document.querySelector('#modalConsoleTarget');


// Event Listeners ===========================================================
// ===========================================================================

//copy the main file text to the clipboard
// getCopyBtn.addEventListener('click', copyToClipboard);
inputButton.addEventListener('click', () => nomNomNom(userInput));
resetButton.addEventListener('click', resetText);
clearButton.addEventListener('click', clearUserInput);
modalPlayBtn.addEventListener('click', playModal);
getCopyBtn.addEventListener('click', copyToClipboard);



// Building the modals =======================================================
// ===========================================================================

// get user input, create a new modal button with the main file name
// and create a new modal with the text from the user input
function nomNomNom(userInput) {
  // if no text is entered, do nothing
  if (userInput.value === '') {
    return;
  }

  // find the user from the input
  const consoleUser = userInput.value.match(/^.+\$ /g);

  // find the main file name from the input
  const mainFileName = userInput.value.match(/(?<=cat ).+/g);
  replaceModalBtn(mainFileName);
  replaceModalTitle(mainFileName);

  // replace a the modal content with the user input
  replaceModalContent(consoleUser, mainFileName, getString(consoleUser));

  // clear the user input
  clearUserInput();
}

// check how many times the string appears in the text
// then create a new string for each instance
function getString(userString) {
  // seperate the text into an array of strings
  const stringArray = userInput.value.split(userString);
  //remove first string from array if it is blank
  if (stringArray[0] === '') {
    stringArray.shift();
  }

  // creates a new array to hold strings
  const newStrings = [];

  // loop through the array of strings
  // create a new string that is the console user
  // and the string that follows it.
  stringArray.forEach((str) => {
    if (str !== '') {
      const newString = userString + str;
      newStrings.push(newString);
    }
  });

  return newStrings;
}

// clear the user input
function clearUserInput() {
  userInput.value = '';
}

// replaces the modal button name with the new main file name
function replaceModalBtn(mainFileName) {
  // remove the modal button text
  modalBtn.innerText = '';
  // add the new main file name
  modalBtn.innerText = mainFileName;
}

// replaces the modal title with the new main file name
function replaceModalTitle(mainFileName) {
  // remove the modal title text
  modalTitle.innerText = '';
  // add the new main file name
  modalTitle.innerText = mainFileName;
}

// function to remove all p tags from the modalBody
// and then add the new new p tags to the modalBody
function replaceModalContent(userName, fileName, consoleStrings) {
  console.log('replacing modal content');
  console.log(consoleStrings);

  // target the modalBody and remove each p element
  const modalP = modalBody.querySelectorAll('p');
  modalP.forEach((p) => {
    p.remove();
  });

  // create a new p tag for each string
  // add the string to the a p tag
  // add the p tag to the modalBody
  consoleStrings.forEach((str) => {
    const p = document.createElement('p');
    p.innerText = str;
    modalBody.appendChild(p);
  });
}

// Modal Functions ===========================================================
// ===========================================================================

// copy the main file text to a clipboard
function copyToClipboard() {
  console.log('copying to clipboard');
  // get the text from the first p tag in the modalBody
  const modalP = modalBody.querySelector('p');
  const text = modalP.innerText.replace(/^.+\n/g, '');
  // copy the main file text to the clipboard
  navigator.clipboard.writeText(text);
}

function playModal() {
  console.log('playing modal');
  const modalBody = document.querySelector('.modal-body');
  const modalP = modalBody.querySelectorAll('p');

  // Store the text from all p tags in an array
  const pTexts = Array.from(modalP).map(p => p.innerText);

  // Clear all p tags
  Array.from(modalP).forEach(p => p.textContent = '');

  // Function to type out the text of a single p tag
  function typeOutText(index) {
    if (index >= modalP.length) return; // Stop when all p tags are processed

    const p = modalP[index];
    let text = pTexts[index]; // Use the stored text

    // Display the consoleUser immediately
    const consoleUserMatch = text.match(/^.+\$/);
    const consoleUser = consoleUserMatch ? consoleUserMatch[0] : '';
    p.innerText = consoleUser; // Set the console user text

    // After a short timeout, type out the rest of the p tag's text
    setTimeout(() => {
      typingSpeed(p, text.slice(consoleUser.length), 0, 75, () => {
        // Once done typing, move to the next p tag
        typeOutText(index + 1);
      });
    }, 500); // Adjust the timeout as needed
  }

  // Start typing out the first p tag
  typeOutText(0);
}

// Modified typingSpeed function to accept a callback when done
function typingSpeed(element, text, index, interval, doneCallback) {
  if (index < text.length) {
    if (text.charAt(index) === '\n') {
      console.log('found a newline');
      // add a timer before adding the rest of the string
      setTimeout(() => {
        element.innerText += text.slice(index);
        doneCallback();
      }, 2500);
    } else if (text.charAt(index) === ' ') {
      console.log('found a space');
      // add the space and the next character
      element.innerText += ' ' + text.charAt(index + 1);
      setTimeout(() => typingSpeed(element, text, index + 2, interval, doneCallback), interval);
    } else {
      element.innerText += text.charAt(index);
      setTimeout(() => typingSpeed(element, text, index + 1, interval, doneCallback), interval);
    }
  } else {
    // Call the doneCallback when typing is finished
    if (typeof doneCallback === 'function') {
      doneCallback();
    }
  }
}

// Testing Functions =========================================================
// ===========================================================================

// reset the text in the input
function resetText() {
  if (userInput.value !== '') {
    clearUserInput();
  }
  addTextToConsole();
}

// add text to the input
function addTextToConsole() {
  const text = `wilfried@search_algorithms$ cat 1-main.c 
#include <stdio.h>
#include <stdlib.h>
#include "search_algos.h"

/**
 * main - Entry point
 *
 * Return: Always EXIT_SUCCESS
 */
int main(void)
{
    int array[] = {
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9
    };
    size_t size = sizeof(array) / sizeof(array[0]);

    printf("Found %d at index: %d\n\n", 2, binary_search(array, size, 2));
    printf("Found %d at index: %d\n\n", 5, binary_search(array, 5, 5));
    printf("Found %d at index: %d\n", 999, binary_search(array, size, 999));
    return (EXIT_SUCCESS);
}
wilfried@search_algorithms$ gcc -Wall -Wextra -Werror -pedantic -std=gnu89 1-main.c 1-binary.c -o 1-binary
wilfried@search_algorithms$ ./1-binary 
Searching in array: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
Searching in array: 0, 1, 2, 3
Searching in array: 2, 3
Found 2 at index: 2

Searching in array: 0, 1, 2, 3, 4
Searching in array: 3, 4
Searching in array: 4
Found 5 at index: -1

Searching in array: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
Searching in array: 5, 6, 7, 8, 9
Searching in array: 8, 9
Searching in array: 9
Found 999 at index: -1`;
  userInput.value = text;
}


// on window load, add text to the modal
window.onload = testTextModal;

// copy the addTextToConsole function
// but have it add text to the modal-body instead
function testTextModal() {
  const modalBody = document.querySelector('.modal-body');
  const text = `wilfried@search_algorithms$ cat 0-main.c
  #include <stdio.h>
  #include <stdlib.h>
  #include "search_algos.h"
  
  /**
   * main - Entry point
   *
   * Return: Always EXIT_SUCCESS
   */
  int main(void)
  {
      int array[] = {
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9
      };
      size_t size = sizeof(array) / sizeof(array[0]);
  
      printf("Found %d at index: %d\n\n", 2, binary_search(array, size, 2));
      printf("Found %d at index: %d\n\n", 5, binary_search(array, 5, 5));
      printf("Found %d at index: %d\n", 999, binary_search(array, size, 999));
      return (EXIT_SUCCESS);
  }`;
  const text2 = `wilfried@search_algorithms$ gcc -Wall -Wextra -Werror -pedantic -std=gnu89 1-main.c 1-binary.c -o 1-binary`;
  const text3 = `wilfried@search_algorithms$ ./1-binary 
  Searching in array: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
  Searching in array: 0, 1, 2, 3
  Searching in array: 2, 3
  Found 2 at index: 2
  
  Searching in array: 0, 1, 2, 3, 4
  Searching in array: 3, 4
  Searching in array: 4
  Found 5 at index: -1
  
  Searching in array: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
  Searching in array: 5, 6, 7, 8, 9
  Searching in array: 8, 9
  Searching in array: 9
  Found 999 at index: -1`;
  // create a p tag for each text
  // add each p tag to the modal body
  const p1 = document.createElement('p');
  const p2 = document.createElement('p');
  const p3 = document.createElement('p');
  p1.innerText = text;
  p2.innerText = text2;
  p3.innerText = text3;
  modalBody.appendChild(p1);
  modalBody.appendChild(p2);
  modalBody.appendChild(p3); 
}