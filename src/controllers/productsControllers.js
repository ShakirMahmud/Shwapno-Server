const { ObjectId } = require("mongodb");
const {getDatabase} = require("../config/dbConnection");

const productsCollection = getDatabase().collection("products");
const categoriesCollection = getDatabase().collection("categories");

const postProduct = async (req, res) => {
    try {
        const { barcode } = req.body;

        // Check if a product with the same barcode exists
        const existingProduct = await productsCollection.findOne({ barcode });

        if (existingProduct) {
            return res.status(400).json({ error: "Product already exists in the database." });
        }

        // Insert only if it doesn't exist
        const result = await productsCollection.insertOne(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to create product" });
    }
};


const getProducts = async (req, res) => {
    const { search } = req.query;

    try {
        let query = {};

        if (search) {
            query.$or = [
                { description: { $regex: search, $options: "i" } },
                { category: { $in: await getCategoriesMatchingSearch(search) } }
            ];
        }

        const products = await productsCollection.find(query).toArray();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
};
const getCategoriesMatchingSearch = async (search) => {
    try {
        const query = { title: { $regex: search, $options: "i" } };
        const categories = await categoriesCollection.find(query).toArray();
        return categories.map(category => category.id);
    } catch (error) {
        console.error("Error fetching categories for search:", error);
        return [];
    }
};



const updateProductCategory = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const { category } = req.body;
        const result = await productsCollection.updateOne({ _id: new ObjectId(id) }, { $set: { category } });
        res.json(result);
        console.log(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to update product category" });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await productsCollection.deleteOne({ _id: new ObjectId(id) });
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to delete product" });
    }
}

module.exports = {
    postProduct,
    getProducts,
    updateProductCategory,
    deleteProduct
}