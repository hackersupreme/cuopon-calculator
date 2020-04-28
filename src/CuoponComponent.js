import React from 'react';
import { useSpring, animated } from 'react-spring';

const CuoponComponent = (props) => {

  let product = props.product;

  let discounts = props.discounts;

  const spring_props = useSpring({
    to: {opacity: 1},
    from: {opacity: 0}
  })

  let cuopons = discounts.map((discount, i) => {

    let percent_off = Math.round(discount * 100) + "% OFF";

    let cuopon_price = (1 - discount) * product.price;
    let goal_cuopons = product.goal / cuopon_price;

    let profit_margin = cuopon_price - product.cost;

    cuopon_price = cuopon_price.toFixed(2);
    profit_margin = profit_margin.toFixed(2);

    return (
      <section style={spring_props}>

        <h4>{percent_off}</h4>

        <p>{"$" + cuopon_price}</p>
        <p>{Math.ceil(goal_cuopons)}</p>
        <p>{"$" + profit_margin}</p>
      </section>
      )

  })

  return(

        <React.Fragment>

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



        </React.Fragment>

    )
}

export default CuoponComponent;