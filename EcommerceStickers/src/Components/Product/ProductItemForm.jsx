import { useState } from 'react';
import { InputGroup, FormControl, Button, FormText } from 'react-bootstrap';
import { useAuth } from '../Auth/AuthContext';
import { useCart } from '../Cart/CartContext';
import { useFloatingAlert } from '../Shared/FloatingAlertContext';

const ProductItemForm = ({ productId, maxQuantity, colors, sizes }) => {
  const [amount, setAmount] = useState(1);
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { showAlert } = useFloatingAlert();
  const selectedColor = colors?.[0]?._id;
  const selectedSize = sizes?.[0]?._id;

  const handleChange = (e) => {
    const value = Math.min(Math.max(+e.target.value, 1), maxQuantity);
    setAmount(value);
  };

  const handleAdd = async () => {
    if (!user) {
      showAlert('Please log in to add to cart.', 'warning');
      return;
    }
    const success = await addToCart(productId, amount, selectedColor, selectedSize);
    if (success) {
      showAlert('🛒 Product added to cart!', 'success');
    }
  };

  return (
    <>
      {maxQuantity > 0 && (
        <InputGroup className="custom-input-group">
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
      )}

      {maxQuantity === 0 ? (
        <FormText className="text-danger d-block mt-1 custom-text">
          Out of stock
        </FormText>
      ) : (
        <FormText className="text-muted d-block mt-1 custom-text">
          In stock: {maxQuantity}
        </FormText>
      )}
    </>
  );
};

export default ProductItemForm;
