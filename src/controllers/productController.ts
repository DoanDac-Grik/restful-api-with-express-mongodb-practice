import Products from "../models/productModel";

const productController = {
    getProducts: async (req, res, next) => {
        try {
            const products = await Products.find();
            return res.status(200).json(products)
        } catch (error) {
            return res.status(500).json({msg: error.message});
        }
    },
    getProduct: async  (req, res, next) => {
        try {
            const product = await Products.findById(req.params.id);
           
            if(!product){
                return res.status(404).json({msg: 'This product does not exit'});
            }

            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json({msg: error.message});    
        }
    },
    addProduct: async (req, res, next) => {
        try {
            const { title, price, description, category, image} = req.body;
            const newProduct = new Products({
                title, price, description, category, image
            });
            await newProduct.save();
            return res.status(200).json(newProduct);
        } catch (error) {
            return res.status(500).json({msg: error.message});    
        }
    },
    updateProduct: async (req, res, next) => {
        try {
            const { title, price, description, category, image} = req.body;
            const product = await Products.findByIdAndUpdate(req.params.id, {
                title, price, description, category, image
            }, { new: true});

            if(!product){
                return res.status(404).json({msg: 'This product does not exit'});
            }

            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json({msg: error.message});    
        }
    },
    deleteProduct: async (req, res, next) => {
        try {
            const product = await Products.findByIdAndDelete(req.params.id);
            return res.status(200).json({msg: "Delete success!"});
        } catch (error) {
            return res.status(500).json({msg: error.message});    
            
        }
    }
}

export default productController;