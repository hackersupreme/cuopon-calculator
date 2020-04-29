import React from 'react';

function InputForm(props) {

    return(

      <section class="input-form">


        <h2>Add a Product</h2>

        <form onSubmit={props.addProduct}>
          <label for="goal-amount">Name</label>
          <input type="text" minlength="1" maxlength="30" name="name" required onChange={props.setName} />
          <label for="goal-amount">Goal Amount ($)</label>
          <input type="number" min="0" max="1000000000000" name="goal" placeholder="$" required onChange={props.setGoal} />
          <label for="product-price">Price of Product ($)</label>
          <input type="number" min="0" max="100000000" name="price" placeholder="$" required onChange={props.setPrice} />
          <label for="product-cost">Cost of Product ($)</label>
          <input type="number" min="0" max="100000000" name="cost" placeholder="$" required onChange={props.setCost} />
          <input class="action" type="submit" value="Create Cuopon" />
        </form>

      </section>

    )
}

export default InputForm