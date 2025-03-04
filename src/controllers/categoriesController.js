const {getDatabase} = require("../config/dbConnection");

const categoriesCollection = getDatabase().collection("categories");
const productsCollection = getDatabase().collection("products");

const getCategories = async (req, res) => {
    const { search } = req.query;

    try {
        let query = {};

        if (search) {
            query.title = { $regex: search, $options: "i" };
        }

        const categories = await categoriesCollection.find(query).toArray();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch categories" });
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

const postCategories = async (req, res) => {
    try {
        const { title, id } = req.body;
        
        // Check if the category already exists in the database
        const existingCategory = await categoriesCollection.findOne({ id });
        if (existingCategory) {
            return res.status(400).json({ error: "Category already exists in the database." });
        }

        const result = await categoriesCollection.insertOne({ title, id });

        const createdCategory = {
            _id: result.insertedId,
            id,
            title
        };

        res.status(201).json(createdCategory);
    } catch (error) {
        res.status(500).json({ error: "Failed to create category" });
    }
};

const deleteCategories = async (req, res) => {
    try {
        const { id } = req.params;
        await productsCollection.updateMany({ category: id }, { $set: { category: "Uncategorized" } });
        const result = await categoriesCollection.deleteOne({ id });
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to delete category" });
    }
}

module.exports = {
    getCategories,
    postCategories,
    deleteCategories
}