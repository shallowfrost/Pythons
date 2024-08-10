function calculateTotalPrice(morphs) {
	let total_price = 0;
	let morph_names_str = "";
	for (const morph of morphs) {
		const morphNum = parseInt(morph);
		total_price += morph_price[morphNum];
		morph_names_str += `${morph_names[morphNum]}, `;
	}
	morph_names_str = morph_names_str.slice(0, -2); // Remove the trailing comma and space
	const total_price_str = `$${total_price.toFixed(2)}`;
	return {
		total_price_str,
		morph_names_str
	};
}
