import React from 'react';

function InputForm(props) {

    return(

      <React.Fragment>

        <h2>Add a Product</h2>

        <form onSubmit={props.addProduct}>
          <label for="goal-amount">Name</label>
          <input type="text" name="name" required onChange={props.setName} />
          <label for="goal-amount">Goal Amount ($)</label>
          <input type="number" min="0" name="goal" placeholder="$" required onChange={props.setGoal} />
          <label for="product-price">Price of Product ($)</label>
          <input type="number" min="0" name="price" placeholder="$" required onChange={props.setPrice} />
          <label for="product-cost">Cost of Product ($)</label>
          <input type="number" min="0" name="cost" placeholder="$" required onChange={props.setCost} />
          <input class="action" type="submit" value="Create Cuopon" />
        </form>

      </React.Fragment>

    )
}

export default InputForm