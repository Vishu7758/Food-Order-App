import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const DUMMY_MEALS = [
	{
		id: "m1",
		name: "Gobi Manchurian",
		description: "Authentic Indo-Chinese Starter",
		price: 120.0,
	},
	{
		id: "m2",
		name: "Tomato Soup",
		description: "Tasy n Healthy soup prepared using Tomato",
		price: 95.0,
	},
	{
		id: "m3",
		name: "Paneer Tikka Masala",
		description: "India's most popular vegeterian dish",
		price: 240.0,
	},
	{
		id: "m4",
		name: "Veg Pulao",
		description: "Healthy...and light...",
		price: 130.0,
	},
];

const AvailableMeals = () => {
	const meals = DUMMY_MEALS.map((meal) => {
		return (
			<MealItem
				key={meal.id}
				id={meal.id}
				name={meal.name}
				description={meal.description}
				price={meal.price}
			/>
		);
	});
	return (
		<section className={classes.meals}>
			<Card>
				<ul>{meals}</ul>
			</Card>
		</section>
	);
};

export default AvailableMeals;
