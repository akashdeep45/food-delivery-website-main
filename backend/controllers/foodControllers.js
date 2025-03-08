import Food from "../model/foodModel.js";

// Add food item
export const addFood = async (req, res) => {
  const { name, description, price, category, image } = req.body;

  const newFood = new Food({
    name,
    description,
    price,
    category,
    image,
  });

  try {
    await newFood.save();
    res
      .status(201)
      .json({ success: true, message: "Food Added", data: newFood });
  } catch (error) {
    console.error("Error adding food:", error);
    res.status(500).json({ success: false, message: "Error adding food" });
  }
};

// List all food items with pagination
export const listFood = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  try {
    const foods = await Food.find({}).limit(limit).skip(skip).exec();

    const count = await Food.countDocuments();

    res.status(200).json({
      success: true,
      data: foods,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error listing foods:", error);
    res.status(500).json({ success: false, message: "Error listing foods" });
  }
};

// Remove food item
export const removeFood = async (req, res) => {
  const { id } = req.body;

  try {
    const food = await Food.findById(id);
    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food item not found" });
    }

    await Food.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.error("Error removing food:", error);
    res.status(500).json({ success: false, message: "Error removing food" });
  }
};

export const listAllFood = async (req, res) => {
  try {
    const allFoods = await Food.find({});
    return res.status(200).json({
      success: true,
      data: allFoods,
    });
  } catch (error) {
    console.error("Error removing food:", error);
    res.status(500).json({ success: false, message: "Error removing food" });
  }
};
