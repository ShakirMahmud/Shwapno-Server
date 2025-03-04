const { getDatabase } = require("../config/dbConnection");

const productsCollection = getDatabase().collection("products");
const categoriesCollection = getDatabase().collection("categories");

const getAnalyticsStats = async (req, res) => {
    try {
        const productsPerCategory = await productsCollection.aggregate([
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "_id",
                    foreignField: "id",
                    as: "categoryDetails"
                }
            },
            {
                $unwind: "$categoryDetails"
            },
            {
                $project: {
                    _id: 0,
                    category: "$categoryDetails.title",
                    count: 1
                }
            }
        ]).toArray();

        // Fetch recently added products
        const recentlyAddedProducts = await productsCollection.find().sort({ _id: -1 }).limit(5).toArray();

        // Fetch total number of products and categories
        const numProducts = await productsCollection.countDocuments();
        const numCategories = await categoriesCollection.countDocuments();

        // Fetch top categories by product count
        const topCategories = await productsCollection.aggregate([
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            },
            {
                $limit: 5
            }
        ]).toArray();


        res.json({
            productsPerCategory,
            recentlyAddedProducts,
            numProducts,
            numCategories,
            topCategories,
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch analytics stats" });
    }
};

module.exports = { getAnalyticsStats };
