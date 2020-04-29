# Cuopon Calculator || React.js Single Page App 



This is a single page app that creates cuopon data to be downloaded in a csv. It's built using [React.js](https://reactjs.org/) and [react-csv](https://www.npmjs.com/package/react-csv). 

![App Screenshot](./inputform.png)

An input form takes in the following data of a product you are trying to sell a cuopon for:
  - Name
  - Goal Amount
  - Price of Product
  - Cost of Product

It then calculates cuopons based on 3 different percentages and lists how many of them you would need to sell to meet your goal amount.

You can add as many products as you would want. You can adjust the three discount percentages to see which would work best.

After adding all your products and adjusting the discount percentages, you can export the data in a csv.



## Live Example

http://cuoponcalculator.hackersupreme.com/


## Installation

This assumes you have the following installed:
  - node.js 
  - node package manager (npm)

Get both here: https://nodejs.org/

###### Instructions

1. Create file directory on your local device
2. Download files to that directory
3. Using a command line software, enter the directory
```
cd directory-name
```
4. Use npm install to get the node modules
```
npm install
```
5. Use npm start to start the server
```
npm start
```


## Documentation

The App component controls the state as well as contains the definitions for functions that affect the state. It passes those down to the following view components: IndexForm, 

