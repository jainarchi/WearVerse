import userModel from "../models/user.model.js";
import productModel from "../models/product.model.js";




const getProductDetails = async (req, res) => {
  const productId = req.params.id

  try {
    const product = await productModel.findById(productId)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      })
    }

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      product
    })

  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: "Something went wrong"
    })
  }
}



const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.aggregate([
      {
        $sort: { createdAt: -1 }
      },
      {
        $project: {
          title: 1,
          price: 1,

          image: {
            $let: {
              vars: {
                firstColor: {
                  $arrayElemAt: [
                    { $objectToArray: "$imagesByColor" },
                    0
                  ]
                }
              },
              in: {
                $arrayElemAt: ["$$firstColor.v.url", 0]
              }
            }

          }
        }
      }
    ])



    if (!products) {
      return res.status(404).json({
        success: false,
        message: "Products not found"
      })
    }

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products
    })

  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: "Something went wrong"
    })
  }
}


export {
  getProductDetails,
  getAllProducts,

};

