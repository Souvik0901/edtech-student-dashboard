const Cart = require('../models/cart');
const ResponseObjectClass = require('../helpers/ResponseObject');
const newResponseObject = new ResponseObjectClass();

const addCartitems = async (req, res) => {
  const { userId, courseId } = req.user;
  try {
    const usercart = await Cart.findOne({ userId });
    if (!usercart) {
      const userCart = new Cart({
        userId,
        courses: [courseId],
      });
      await userCart.save();
      return res.send(
        newResponseObject.create({
          code: 200,
          success: true,
          message: 'Cart created and item added successfully',
          data: userCart,
        }),
      );
    }
    const result = await Cart.updateOne({ userId }, { $push: { courses: courseId } });
    return res.send(
      newResponseObject.create({
        code: 200,
        success: true,
        message: 'Cartitem added successfully',
        data: result,
      }),
    );
  } catch (error) {
    return res.send(
      newResponseObject.create({
        code: 500,
        success: false,
        message: error,
      }),
    );
  }
};

const getCartitems = async (req, res) => {
  const { userId } = req.user;
  try {
    const usercart = await Cart.findOne({ userId }).populate('userId').populate('courses').exec();
    if (!usercart) {
      return res.send(
        newResponseObject.create({
          code: 200,
          success: true,
          message: 'Cart is empty',
          data: [],
        }),
      );
    }
    const { courses } = usercart;
    const userdetails = usercart.userId;
    return res.send(
      newResponseObject.create({
        code: 200,
        success: true,
        message: 'Cartitems recieved successfully',
        userDetails: userdetails,
        data: courses,
      }),
    );
  } catch (error) {
    return res.send(
      newResponseObject.create({
        code: 500,
        success: false,
        message: error,
      }),
    );
  }
};

const emptyCart = async (req, res) => {
  const { userId } = req.user;
  try {
    const emptycart = await Cart.deleteOne({ userId });
    return res.send(
      newResponseObject.create({
        code: 200,
        success: true,
        message: 'Cart emptied successfully',
        data: emptycart,
      }),
    );
  } catch (error) {
    return res.send(
      newResponseObject.create({
        code: 500,
        success: false,
        message: error,
      }),
    );
  }
};

const removeCartitems = async (req, res) => {
  const { userId, courseId } = req.user;
  try {
    const usercart = await Cart.findOne({ userId });
    const cartitems = usercart.courses;
    const updatedcart = cartitems.filter((items) => items.toString() !== courseId);
    console.log(updatedcart);
    const result = await Cart.updateOne(
      { userId },
      {
        $set: {
          courses: updatedcart,
        },
      },
    );
    return res.send(
      newResponseObject.create({
        code: 200,
        success: true,
        message: 'Cart items removed successfully',
        data: result,
      }),
    );
  } catch (error) {
    return res.send(
      newResponseObject.create({
        code: 500,
        success: false,
        message: error,
      }),
    );
  }
};

module.exports = {
  addCartitems,
  getCartitems,
  emptyCart,
  removeCartitems,
};
