import React from 'react';
import DiscountForm from './DiscountForm.js'

const Cuopon = (props) => {

  let product = props.product;

  let discounts = props.discounts;

  let cuopons = discounts.map((discount, i) => {

    let percent_off = Math.round(discount * 100) + "% OFF";

    let cuopon_price = (1 - discount) * product.price;
    let goal_cuopons = product.goal / cuopon_price;

    let profit_margin = cuopon_price - product.cost;

    cuopon_price = cuopon_price.toFixed(2);
    profit_margin = profit_margin.toFixed(2);

    return (
      <section>

        <h4>{percent_off}</h4>

        <p>{"$" + cuopon_price}</p>
        <p>{Math.ceil(goal_cuopons)}</p>
        <p>{"$" + profit_margin}</p>
      </section>
      )

  })

  return(

        <article id={product.id}>

          <section>
          <h3>{product.id}</h3>
          <h5>{product.name}</h5>
          <p>Goal</p>
          <p>{"$" + product.goal}</p>
          <p>Price</p>
          <p>{"$" + product.price}</p>
          <p>Cost</p>
          <p>{"$" + product.cost}</p>
          </section>

          <section>

            <p>Discount</p>
            <p>Cuopon Price</p>
            <p>Number Needed to Meet Goal</p>
            <p>Profit Margin</p>

          </section>

          {cuopons}



        </article>

    )

}

const CuoponList = (props) => {

  let products = props.products.reverse();

  let cuopons = products.map((product, i) => {

    return(
      <React.Fragment>
      <Cuopon product={product} key={i} discounts={props.discounts} />
      <button class="removal-button" onClick={() => props.removeProduct(product.id)}>Remove</button>
      </React.Fragment>
      )

  })

  return(
    <section class="cuopons">

      <h2>Cuopons</h2>

      <DiscountForm 
        discounts={props.discounts} 
        setDiscount1={(e) => props.updateDiscounts(e)} 
        setDiscount2={(e) => props.updateDiscounts(e)} 
        setDiscount3={(e) => props.updateDiscounts(e)} 
      />

      {props.csv()}

      {cuopons}

    </section>
    )

}

export default CuoponList;