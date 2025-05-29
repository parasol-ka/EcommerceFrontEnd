import React, { useState } from 'react';
import { InputGroup, FormControl, Button, FormText } from 'react-bootstrap';

const ProductItemForm = ({ productId, maxQuantity }) => {
  const [amount, setAmount] = useState(1);

  const handleChange = (e) => {
    const value = Math.min(Math.max(+e.target.value, 1), maxQuantity);
    setAmount(value);
  };

  const handleAdd = () => {
    console.log(`Add ${amount} of product ${productId}`);
  };

  return (
    <>
      <InputGroup >
        <FormControl
          className="custom-input"
          type="number"
          min="1"
          max={maxQuantity}
          value={amount}
          onChange={handleChange}
        />
        <Button
          variant="outline-primary"
          className="custom-button"
          onClick={handleAdd}
        >
          Add
        </Button>
      </InputGroup>

      {/* Affichage en dessous */}
      <FormText className="text-muted d-block mt-1">
        In stock: {maxQuantity}
      </FormText>
    </>
  );
};

export default ProductItemForm;
