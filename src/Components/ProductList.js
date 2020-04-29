import React from 'react';


const ProductList = (props) => {

	let products = props.products;

	products = products.reverse();

    let rows = products.map((product, i) => {

      return(

        <tr key={i}>
          <td>{product.id}</td>
          <td>{product.name}</td>
          <td>{"$" + product.goal}</td>
          <td>{"$" + product.price}</td>
          <td>{"$" + product.cost}</td>
          <td><a href={"#" + product.id}>link</a></td>
          <td><button onClick={() => props.removeProduct(product.id)}>Remove</button></td>
        </tr>

        )
    });

    return(
    	<section class="products">

        <h2>Products</h2>

        <table>
        	<thead>
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
          </thead>

          <tbody>
        {rows}
        </tbody>

        </table>

        </section>
    	)

}

export default ProductList