import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import { useContext } from "react";

const clickHandler = (event) => {
	alert("Oredering Food!");
};

const Cart = (props) => {
	const cartCtx = useContext(CartContext);

	const totalAmount = `₹${cartCtx.totalAmount.toFixed(2)}`;

	const hasItems = cartCtx.items.length > 0;

	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};

	const cartItemAddHandler = (item) => {
		cartCtx.addItem({ ...item, amount: 1 });
	};

	const cartItems = (
		<ul className={classes["cart-items"]}>
			{cartCtx.items.map((item) => {
				return (
					<CartItem
						key={item.id}
						amount={item.amount}
						name={item.name}
						price={item.price}
						onRemove={cartItemRemoveHandler.bind(null, item.id)}
						onAdd={cartItemAddHandler.bind(null, item)}
					/>
				);
			})}
		</ul>
	);
	return (
		<Modal onClick={props.onClose}>
			{cartItems}
			<div className={classes.total}>
				<span>Total Amt</span>
				<span>{totalAmount}</span>
			</div>
			<div className={classes.actions}>
				<button className={classes["button--alt"]} onClick={props.onClose}>
					Close
				</button>
				{hasItems && (
					<button className={classes.button} onClick={clickHandler}>
						Order
					</button>
				)}
			</div>
		</Modal>
	);
};

export default Cart;
