import React from 'react';

const DiscountForm = (props) => {

  return(

    <form class="discounts">

      <label for="first-discount">Discount Percentages (0-100)</label>
      <input type="number" min="0" max="100" placeholder={props.discounts[0] * 100} name="first-discount" onChange={props.setDiscount1} />    
      <input type="number" min="0" max="100" placeholder={props.discounts[1] * 100} name="second-discount" onChange={props.setDiscount1} />
      <input type="number" min="0" max="100" placeholder={props.discounts[2] * 100} name="third-discount" onChange={props.setDiscount1} />

    </form>

    )

}

export default DiscountForm;