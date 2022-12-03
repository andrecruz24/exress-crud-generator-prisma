
const crud_controller = {};

function parseNumber(value) {
	// Make sure it is a number
	if (isNaN(value)) {
		// If it's not a number return null
		return null;
	}
	// Transform the id from a String to a Number
	return Number(value);
}


crud_controller.getAll = (model) => async (req, res) => {
	const all_itens = await model.findMany();
	if (all_itens.length > 0)
		return res.json(all_itens);
	res.status(204);
};

crud_controller.getById = (model) => async (req, res, next) => {
	// Get the case id from the url params
	let { id } = req.params;

	// Verifiy that id is a number
	id = parseNumber(id);

	if (!id) {
		res.status(400);
		return next("Id needs to be a number");
	}

	const requested_item= await model.findUnique({
		where: { id },
	});

	if (requested_item) {
		res.json(requested_item);
	} else {
		next("Record not found");
	}
};
