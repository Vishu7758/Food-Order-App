import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
	items: [],
	totalAmount: 0,
};

const cartReducer = (prevState = defaultCartState, action) => {
	if (action.type === "ADD-ITEM") {
		console.log("Called");
		console.log(action.item.amount);
		const newTotalAmount =
			prevState.totalAmount + action.item.price * action.item.amount;

		const existingCartItemIndex = prevState.items.findIndex(
			(item) => item.id === action.item.id
		);

		const existingItem = prevState.items[existingCartItemIndex];
		let updatedItems;

		debugger;
		if (existingItem) {

			const updatedItem = {
				...existingItem,
				amount: existingItem.amount + action.item.amount,
			};
			updatedItems = [...prevState.items];
			updatedItems[existingCartItemIndex] = updatedItem;
			console.log(updatedItem.amount);
			console.log(updatedItems);
		} else {
			updatedItems = [...prevState.items].concat(action.item);
		}
		return {
			items: updatedItems,
			totalAmount: newTotalAmount,
		};
	}
	if (action.type === "REMOVE") {
		const existingCartItemIndex = prevState.items.findIndex(
			(item) => item.id === action.id
		);
		console.log(action.id);
		const existingItem = prevState.items[existingCartItemIndex];
		const newTotalAmount = prevState.totalAmount - existingItem.price;
		let updatedItems;
		// console.log(existingItem);
		console.log(newTotalAmount);
		if (existingItem.amount === 1) {
			updatedItems = prevState.items.filter((item) => item.id !== action.id);
		} else {
			const updatedItem = {
				...existingItem,
				amount: existingItem.amount - 1,
			};
			updatedItems = [...prevState.items];
			updatedItems[existingCartItemIndex] = updatedItem;
			// console.log(updatedItem.amount);
			// console.log(updatedItems);
		}
		return {
			items: updatedItems,
			totalAmount: newTotalAmount,
		};
	}
	return defaultCartState;
};

const CartProvider = (props) => {
	const [cartState, cartDispatcher] = useReducer(cartReducer, defaultCartState);

	const addItemToCartHandler = (item) => {
		cartDispatcher({
			type: "ADD-ITEM",
			item: item,
		});
	};
	const removeItemFromCartHandler = (id) => {
		cartDispatcher({
			type: "REMOVE",
			id: id,
		});
	};
	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
	};
	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
