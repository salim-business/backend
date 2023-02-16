var express = require("express");
var router = express.Router();
const { log, error } = require("../../logger");
const { browseController } = require("../../controllers");

const { Products, gridProducts, Banners, Cart, Order } = require("../../models");
const { browseService } = require("../../services");
const xtend = require("xtend");
/* GET home page. */
router.get("/", async function (req, res, next) {
	const products = await Products.find({});
	const grid = await gridProducts.find({});
	const banner = await Banners.find({});
	const cartProducts = await Cart.find({ cookies: req.cookies._y });
	let total = 0;

	await cartProducts.forEach((e) => {
		total = total + Number(e.quantity) * Number(e.cost);
	});


	res.render("index", {
		title: "Igc fashion",
		carouselProducts: "carouselProducts",
		banners: "banners",
		gridProducts: "gridProducts",
		gridProducts2: "gridProducts2",
		popup: "popup",
		MainContent: "home",
		products,
		grid,
		banner,
		cartProducts,
		total,
	});
});

router.get("/view-product/:id", async function (req, res, next) {
	const cartProducts = await Cart.find({ cookies: req.cookies._y });
	const product = await Products.findOne({ _id: req.params.id }) || await gridProducts.findOne({ _id: req.params.id });
	const { name, description, category, cost, id, imgIds } = product;
	
	if(imgIds.length < 10){

		// const missing = 10 - imgIds.length;

		for(let x=imgIds.length; x < 10; x++){

			log(x)
			imgIds.push('no image')		

		}

	}

	// return log(imgIds, imgIds.length, "length")

	const { data } = await browseService.findCategories(
		"products",
		category
	);

	res.render("viewProduct", {
		title: "Igc fashion",
		reviews: "reviews",
		gridProducts: "gridProducts",
		gridProducts2: "gridProducts2",
		productView: "product",
		thumbnail: "thumbnail",
		productForm: "productForm",
		productInfo: "productInfo",
		relatedProducts: "relatedProducts",
		popup: "popup",
		product,
		cartProducts,
		imgIds,
		name,
		description,
		category,
		cost,
		id,
		data,
	});
});

router.get("/collections/:products", async function (req, res, next) {
	const { data } = await browseService.findCategories(
		req.params.products,
		req.query
	);
	const cartProducts = await Cart.find({ cookies: req.cookies._y });
	let total = 0;

	await cartProducts.forEach((e) => {
		total = total + Number(e.quantity) * Number(e.cost);
	});

	res.render("collections", {
		title: "Igc fashion",
		carouselProducts: "carouselProducts",
		banners: "banners",
		reviews: "reviews",
		gridProducts: "gridProducts",
		gridProducts2: "gridProducts2",
		collectionsProduct: "collectionsProduct",
		data,
		popup: "popup",
		cartProducts,
		total,
	});
});

router.post("/cart/add.js", async function (req, res, next) {
	const exists = await Cart.findOne({
		productId: req.body.items[0].id,
		cookies: req.cookies._y,
	});
	try {
		const product = await Products.findById(req.body.items[0].id);
		const {
			name,
			cost,
			category,
			description,
			imgIds,
			streamIds,
			cookies,
			quantity,
		} = product;
		const cart2 = {
			name,
			cost,
			category,
			description,
			imgIds,
			streamIds,
			cookies,
			quantity,
		};
		const cart3 = xtend(cart2, {
			quantity: req.body.items[0].quantity,
			cookies: req.cookies._y,
			productId: product.id,
		});

		if (!exists) {
			await Cart.create(cart3).then((item) => {
				res.json(item);
			});
		}

		if (exists) {
			await Cart.findOneAndUpdate(
				{ productId: exists.productId },
				{ quantity: Number(exists.quantity) + 1 }
			).then((item) => {
				res.json(item);
			});
		}
	} catch (err) {
		error(err, err.code);
		err.code === 11000 ? res.redirect("/cart") : res.send(err);
	}
});

router.post("/cart/change.js", async function (req, res, next) {
	const product = await Cart.findById(req.body.line);

	if (req.body.quantity > 0) {
		await Cart.findOneAndUpdate(
			{ cookies: req.cookies._y, productId: req.body.line },
			{ quantity: req.body.quantity }
		).then((item) => {
			res.send({
				token: "a56a9fdd94a501892ec4afa6fbcd3647",
				note: null,
				attributes: {},
				original_total_price: 0,
				total_price: 0,
				total_discount: 0,
				total_weight: 0,
				item_count: 0,
				items: [],
				requires_shipping: false,
				currency: "USD",
				items_subtotal_price: 0,
				cart_level_discount_applications: [],
			});
		});
	} else
		await Cart.findOneAndDelete({
			cookies: req.cookies._y,
			productId: req.body.line,
		}).then((item) => {
			res.send({
				token: "a56a9fdd94a501892ec4afa6fbcd3647",
				note: null,
				attributes: {},
				original_total_price: 0,
				total_price: 0,
				total_discount: 0,
				total_weight: 0,
				item_count: 0,
				items: [],
				requires_shipping: false,
				currency: "USD",
				items_subtotal_price: 0,
				cart_level_discount_applications: [],
			});
		});
});

router.get("/cart.js", async function (req, res, next) {
	await Cart.find({ cookies: req.cookies._y }).then((products) => {
		res.send({
			original_total_price: 35000,
			total_price: 35000,
			total_discount: 0,
			total_weight: 0.0,
			item_count: products.length,
			items: products,
			items_subtotal_price: 35000,
			cart_level_discount_applications: [],
		});
	});

	// res.send({
	// 	"token": "b9ffe75095a8b9b2241d0c19f3a81105",
	// 	"note": null,
	// 	"attributes": {},
	// 	"original_total_price": 35000,
	// 	"total_price": 35000,
	// 	"total_discount": 0,
	// 	"total_weight": 0.0,
	// 	"item_count": 2,
	// 	"items": [
	// 		{
	// 			"id": 31199879430196,
	// 			"properties": null,
	// 			"quantity": 1,
	// 			"variant_id": 31199879430196,
	// 			"key": "31199879430196:152986b40ee680774e168406ac7e5c88",
	// 			"title": "Cotton Crewneck Sweater",
	// 			"price": 35000,
	// 			"original_price": 35000,
	// 			"discounted_price": 35000,
	// 			"line_price": 35000,
	// 			"original_line_price": 35000,
	// 			"total_discount": 0,
	// 			"discounts": [],
	// 			"sku": "00111",
	// 			"grams": 0,
	// 			"vendor": "IGC",
	// 			"taxable": true,
	// 			"product_id": 4347410415668,
	// 			"product_has_only_default_variant": true,
	// 			"gift_card": false,
	// 			"final_price": 35000,
	// 			"final_line_price": 35000,
	// 			"url": "\/products\/cotton-crewneck-sweater?variant=31199879430196",
	// 			"featured_image": {
	// 				"aspect_ratio": 0.78,
	// 				"alt": "Cotton Crewneck Sweater",
	// 				"height": 1667,
	// 				"url": "https:\/\/cdn.shopify.com\/s\/files\/1\/0275\/1814\/0468\/products\/2605987251_1_1_1_7af4f909-456b-4e53-8601-b726fc1bd01d.jpg?v=1573629817",
	// 				"width": 1300
	// 			},
	// 			"image": "https:\/\/cdn.shopify.com\/s\/files\/1\/0275\/1814\/0468\/products\/2605987251_1_1_1_7af4f909-456b-4e53-8601-b726fc1bd01d.jpg?v=1573629817",
	// 			"handle": "cotton-crewneck-sweater",
	// 			"requires_shipping": true,
	// 			"product_type": "Hoodie",
	// 			"product_title": "Cotton Crewneck Sweater",
	// 			"variant_title": null,
	// 			"variant_options": [
	// 				"Default Title"
	// 			],
	// 			"options_with_values": [
	// 				{
	// 					"name": "Title",
	// 					"value": "Default Title"
	// 				}
	// 			],
	// 			"line_level_discount_allocations": [],
	// 			"line_level_total_discount": 0
	// 		},
	// 		{
	// 			"id": 321199879430196,
	// 			"properties": null,
	// 			"quantity": 1,
	// 			"variant_id": 31199879430196,
	// 			"key": "31199879430196:152986b40ee680774e168406ac7e5c88",
	// 			"title": "Cotton Crewneck Sweater",
	// 			"price": 35000,
	// 			"original_price": 35000,
	// 			"discounted_price": 35000,
	// 			"line_price": 35000,
	// 			"original_line_price": 35000,
	// 			"total_discount": 0,
	// 			"discounts": [],
	// 			"sku": "00111",
	// 			"grams": 0,
	// 			"vendor": "IGC",
	// 			"taxable": true,
	// 			"product_id": 4347410415668,
	// 			"product_has_only_default_variant": true,
	// 			"gift_card": false,
	// 			"final_price": 35000,
	// 			"final_line_price": 35000,
	// 			"url": "\/products\/cotton-crewneck-sweater?variant=31199879430196",
	// 			"featured_image": {
	// 				"aspect_ratio": 0.78,
	// 				"alt": "Cotton Crewneck Sweater",
	// 				"height": 1667,
	// 				"url": "https:\/\/cdn.shopify.com\/s\/files\/1\/0275\/1814\/0468\/products\/2605987251_1_1_1_7af4f909-456b-4e53-8601-b726fc1bd01d.jpg?v=1573629817",
	// 				"width": 1300
	// 			},
	// 			"image": "https:\/\/cdn.shopify.com\/s\/files\/1\/0275\/1814\/0468\/products\/2605987251_1_1_1_7af4f909-456b-4e53-8601-b726fc1bd01d.jpg?v=1573629817",
	// 			"handle": "cotton-crewneck-sweater",
	// 			"requires_shipping": true,
	// 			"product_type": "Hoodie",
	// 			"product_title": "Cotton Crewneck Sweater",
	// 			"variant_title": null,
	// 			"variant_options": [
	// 				"Default Title"
	// 			],
	// 			"options_with_values": [
	// 				{
	// 					"name": "Title",
	// 					"value": "Default Title"
	// 				}
	// 			],
	// 			"line_level_discount_allocations": [],
	// 			"line_level_total_discount": 0
	// 		}
	// 	],
	// 	"requires_shipping": true,
	// 	"currency": "USD",
	// 	"items_subtotal_price": 35000,
	// 	"cart_level_discount_applications": []
	// })
});

router.get("/cart", async function (req, res, next) {
	const cartProducts = await Cart.find({ cookies: req.cookies._y });
	let total = 0;

	await cartProducts.forEach((e) => {
		total = total + Number(e.quantity) * Number(e.cost);
	});

	if (req.query.view == "popup") {
		res.render("popup", {
			cartProducts,
			total,
		});
	} else {
		res.render("shopping-cart", {
			cartProducts,
			total,
		});
	}

	// console.log(cartProducts, "djdjdjj")
	// res.sendFile('/home/geophrey/Documents/igc-backend/routes/v1/test.ejs')
});

router.get("/view-shopping-cart", async function (req, res, next) {
	const cartProducts = await Cart.find({ cookies: req.cookies._y });

	let total = 0;

	await cartProducts.forEach((e) => {
		// console.log(e)
		total = total + Number(e.quantity) * Number(e.cost);
	});

	

	res.render("index", {
		cartProducts,
		total,
		MainContent: "shopping-cart",
		popup: "popup",
	});
});

router.get('/inventory', async(req,res)=>{

Products.find({}, (err, products)=>{
	res.json(products)
})



})






router.get(
	"/products/cotton-crewneck-sweater",
	async function (req, res, next) {
		// const images = [];

		// ['6304ff4149127989b773d546',
		// '6304ff4649127989b773d557',
		// '6304ff4a49127989b773d563',
		// '6304ff4f49127989b773d571',
		// '6304ff5449127989b773d581',
		// '6304ff5a49127989b773d58b',
		// '6304ff5f49127989b773d597',
		// '6304ff6449127989b773d5a3',
		// '6304ff6949127989b773d5af',
		// '6304ff6e49127989b773d5c1'].forEach(element, i => {
		// 	let j = {
		// 		"id": i,
		// 		"src": `/api/v1/gfsUpload/preview/${element}`
		// 	}
		// 	image.push(j)
		// });
		// const item = a

		// [
		// 	"63109c4569a5b26239f2e81a",
		// 	"63109c5069a5b26239f2e84f",
		// 	"63109c6069a5b26239f2e884",
		// 	"63109c6069a5b26239f2e881",
		// 	"63109c6169a5b26239f2e8cf",
		// 	"63109c6169a5b26239f2e902",
		// 	"63109c6269a5b26239f2e937",
		// 	"63109c6f69a5b26239f2ea8d",
		// 	"63109c6e69a5b26239f2ea5b",
		// 	"63109c7d69a5b26239f2eb0b"
		// ]
		res.status(200).json({
			images: [
				{
					id: "13457387716660",
					src: "/api/v1/gfsUpload/preview/63109c5069a5b26239f2e84f",
				},
				{
					id: "13457387716660",
					src: "/api/v1/gfsUpload/preview/63109c6069a5b26239f2e884",
				},{
					id: "13457387716660",
					src: "/api/v1/gfsUpload/preview/63109c6069a5b26239f2e881",
				},{
					id: "13457387716660",
					src: "/api/v1/gfsUpload/preview/63109c6169a5b26239f2e8cf",
				},{
					id: "13457387716660",
					src: "/api/v1/gfsUpload/preview/63109c6169a5b26239f2e902",
				},
				
			],
			media: [
				{
					id: "5629252927540",
				},
			],
			metafields: {},
			variants_metafields: [],
			default_variant_id: "31199879430196",
			image_size: "600x",
		});
	}
);


router.post(
	"/cart",
	async function (req, res, next) {

		// console.log(req.body)
		let total;

		if(req.body.address.country && req.body.address.zip && req.body.note){


			const cartProducts = await Cart.find({ cookies: req.cookies._y });


			await cartProducts.forEach(async(product) => {
				// console.log(e)
				total = total + Number(product.quantity) * Number(product.cost);
				const {
					name,
					cost,
					category,
					description,
					imgIds,
					streamIds,
					cookies,
					quantity,
					productId
				} = product;
				const cart2 = {
					name,
					cost,
					category,
					description,
					imgIds,
					streamIds,
					cookies,
					quantity,
					productId
				};
				const cart3 = xtend(cart2, {
					country: req.body.address.country,
					city: req.body.address.zip,
					contact: req.body.note
				});
		
				await Order.create(cart3).then(async (item) => {
		
					
		
					await Cart.deleteMany({ cookies: req.cookies._y }).then((deleted)=>{
						log(deleted)
						// res.json(item);

						// res.redirect('Yo')
						res.send("Your order has been submit. Thank you for shopping with igc fashion.	")
		
					})
			
		
				});
		
		
		
		
			});


		}else res.send("Please fill in the your address before you submit the order")
	
	




	}
);


module.exports = router;
