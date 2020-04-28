import React, { Component, useState, useEffect } from 'react';
import './index.css';
import { useSpring, animated } from 'react-spring';
import { Spring } from 'react-spring/renderprops';
import { CSVLink, CSVDownload } from "react-csv";


import InputForm from './InputForm.js'
import CuoponComponent from './CuoponComponent.js'
import DiscountForm from './DiscountForm.js'

/*

== App Overview ==

App
  Constructor
    State Declaration

  addProduct(e)
    function adds product to state

  removeProduct(index)
    function removes product from state

  updateDiscounts(e)
    changes discount percentage based off of user input

  generateProducts()
    creates HTML table rows

  generateCuopons()
    generates HTML ofd cuopons

  generateCSV()
    creates array from state and downloads csv of it


*/




class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      products: [],
      id: 0,
      name: "",
      goal: 0,
      price: 0,
      cost: 0,
      form_display: false,
      discounts: [0.1,0.2,0.5]
    }

    this.addProduct = this.addProduct.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.generateProducts = this.generateProducts.bind(this);
    this.generateCuopons = this.generateCuopons.bind(this);
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


  generateProducts() {

    let products = this.state.products.slice(0);

    products = products.reverse();

    let display = products.map((product, i) => {

      return(

        <tr key={i}>
          <td>{product.id}</td>
          <td>{product.name}</td>
          <td>{"$" + product.goal}</td>
          <td>{"$" + product.price}</td>
          <td>{"$" + product.cost}</td>
          <td><a href={"#" + i}>link</a></td>
          <td><button onClick={() => this.removeProduct(product.id)}>Remove</button></td>
        </tr>

        )
    });

    return display;
  }

  generateCuopons() {

    let products = this.state.products.slice(0);

    products = products.reverse();

    let discounts = this.state.discounts;

    let cuopons = products.map((product, i) => {

      return(

        <article id={product.id} key={i}>
          <CuoponComponent discounts={discounts} i={i} product={product} />
          <button onClick={() => this.removeProduct(product.id)}>Remove</button>
        </article>

        )

    })

    return cuopons
  }

  generateCSV() {

    let products = this.state.products.slice(0);

    let discounts = this.state.discounts.slice(0);

    let csv_array = [
      ["id", "name", "goal", "price", "cost", 
      "discount_percent_1", "cuopon_price_1", "num_cuopons_1", "profit_margin_1", 
      "discount_percent_2", "cuopon_price_2", "num_cuopons_2", "profit_margin_2",
      "discount_percent_3", "cuopon_price_3", "num_cuopons_3", "profit_margin_3"
       ]
    ]

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

    console.log(csv_array);

    return(
      <CSVLink data={csv_array}><button class="action" onClick={() => this.generateCSV()}>Download as CSV</button></CSVLink>
      )

  }

  render() {

    let products = this.generateProducts();

    let cuopons = this.generateCuopons();

    let csv = this.generateCSV();

    return(

    <React.Fragment>

    <header>

      <h1>Cuopon Calculator</h1>  

    </header>

    <main>

      <section class="input-form">

        <InputForm 
          setName={(e) => this.setState({name: e.target.value})}
          setGoal={(e) => this.setState({goal: e.target.value})} 
          setPrice={(e) => this.setState({price: e.target.value})} 
          setCost={(e) => this.setState({cost: e.target.value})} 
          addProduct={(e) => this.addProduct(e)}
        />


      </section>

      <section class="products">

        <h2>Products</h2>

        <table>
          <tr>
            <th>
              Id
            </th>
            <th>
              Name
            </th>
            <th>
              Goal
            </th>
            <th>
              Price
            </th>
            <th>
              Cost
            </th>
            <th>
              Cuopons
            </th>
            <th>
              Remove
            </th>
          </tr>

        {products}

        </table>

      </section>

      
      <section class="cuopons">

        <h2>Cuopons</h2>

        <DiscountForm 
        discounts={this.state.discounts} 
        setDiscount1={(e) => this.updateDiscounts(e)} 
        setDiscount2={(e) => this.updateDiscounts(e)} 
        setDiscount3={(e) => this.updateDiscounts(e)} 
        />

        
        {csv}

        {cuopons}

      </section>
      

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
