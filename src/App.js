import React, { Component, useState, useEffect } from 'react';
import './index.css';
import { useSpring, animated } from 'react-spring';
import { Spring } from 'react-spring/renderprops';
import { CSVLink, CSVDownload } from "react-csv";


import InputForm from './Components/InputForm.js'
import CuoponList from './Components/CuoponComponent.js'
import DiscountForm from './Components/DiscountForm.js'
import ProductList from './Components/ProductList.js'



function generateCSVArray(products, discounts) {

    //csv headers
    let csv_array = [
      ["id", "name", "goal", "price", "cost", 
      "discount_percent_1", "cuopon_price_1", "num_cuopons_1", "profit_margin_1", 
      "discount_percent_2", "cuopon_price_2", "num_cuopons_2", "profit_margin_2",
      "discount_percent_3", "cuopon_price_3", "num_cuopons_3", "profit_margin_3"
       ]
    ]

    /*
    csv_array = [
      [...headers],
      product,
      product,
      ...
    ]
    */

    for (let i = 0; i < products.length; i++) {
      let product = [];
      product.push(products[i].id);
      product.push(products[i].name);
      product.push(products[i].goal);
      product.push(products[i].price);
      product.push(products[i].cost);

      for (let j = 0; j < discounts.length; j++) {

        let discount_percent = discounts[j] * 100;

        let cuopon_price = (1 - discounts[j]) * products[i].price;

        let num_cuopons = products[i].goal / cuopon_price;

        let profit_margin = cuopon_price - products[i].cost;

        product.push(discount_percent);
        product.push(cuopon_price);
        product.push(Math.ceil(num_cuopons));
        product.push(profit_margin);

      }

      csv_array.push(product);

    }

    return csv_array
}



class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      products: [],
      name: "",
      goal: 0,
      price: 0,
      cost: 0,
      discounts: [0.1, 0.2, 0.5]
    }

    this.addProduct = this.addProduct.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.updateDiscounts = this.updateDiscounts.bind(this);
    this.generateCSV = this.generateCSV.bind(this);
  }

  addProduct(e) {

    e.preventDefault();

    let products_copy = this.state.products.slice(0);

    let product = {
      id: products_copy.length,
      name: this.state.name,
      goal: this.state.goal,
      price: this.state.price,
      cost: this.state.cost
    };


    products_copy.push(product);

    this.setState({
      products: products_copy
    });

  }

  removeProduct(index) {

    let products_copy = this.state.products.slice(0);

    let updated_products = [];

    for (let i = 0; i < products_copy.length; i++) {

      if (i != index) {

        updated_products.push(products_copy[i]);

      }

    }

    for (let i = 0; i < updated_products.length; i++) {
      updated_products[i].id = i;
    }

    this.setState({
      products: updated_products
    })

  }

  updateDiscounts(e) {

    e.preventDefault();

    let discounts = this.state.discounts.slice(0);

    let index;

    switch (e.target.name) {
      case "first-discount":
        index = 0;
        break;
      case "second-discount":
        index = 1;
        break;
      case "third-discount":
        index = 2;
        break;
    }

    for (let i = 0; i < discounts.length; i++) {

      if (i == index) {

        discounts[i] = e.target.value / 100;

      }

    }

    this.setState({
      discounts: discounts
    })

  }


  generateCSV() {

    let products = this.state.products.slice(0);

    let discounts = this.state.discounts.slice(0);

    let csv_array = generateCSVArray(products, discounts);

    return(
      <CSVLink data={csv_array}><button class="action" onClick={() => this.generateCSV()}>Download as CSV</button></CSVLink>
      )

  }

  render() {

    let csv = this.generateCSV();

    return(

    <React.Fragment>

    <header>

      <h1>Cuopon Calculator</h1>  

    </header>

    <main>

      <InputForm 
        setName={(e) => this.setState({name: e.target.value})}
        setGoal={(e) => this.setState({goal: e.target.value})} 
        setPrice={(e) => this.setState({price: e.target.value})} 
        setCost={(e) => this.setState({cost: e.target.value})} 
        addProduct={(e) => this.addProduct(e)}
      />

      <ProductList 
        products={this.state.products.slice(0)} 
        removeProduct={this.removeProduct} 
      />
      
      <CuoponList
        products={this.state.products.slice(0)}
        discounts={this.state.discounts.slice(0)}
        csv={this.generateCSV}
        removeProduct={this.removeProduct} 
        updateDiscounts={this.updateDiscounts}
      />

    </main>


    <footer>

      <nav>

        <a href="https://instagram.com/jeffgsch" target="_blank">insta</a>

        <a href="http://hackersupreme.com">hacker supreme</a>

        <a href="http://photos.hackersupreme.com">photography</a>

      </nav>

    </footer>

    </React.Fragment>     

      )

  }

}

export default App;
