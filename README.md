# cuopon-calculator
*** Cuopon Calculator React.js App ***

Installation

This is a single page app that creates cuopon data to be downloaded in a csv. It's built using React.js and react-csv (https://www.npmjs.com/package/react-csv). 

An input form takes in the following data of a product you are trying to sell a cuopon for:
  -Name
  -Goal Amount
  -Price of Product
  -Cost of Product

It then calculates cuopons based on 3 different percentages and lists how many of them you would need to sell to meet your goal amount.

live url: http://cuoponcalculator.hackersupreme.com/


=== How it Works ===

The App component controls the state as well as contains the definitions for functions that affect the state. It passes those down to the following view components: IndexForm, 

