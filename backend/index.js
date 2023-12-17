import express from "express";
import data from "./data.js";
import cors from "cors"

const PORT=3000;
const app=express();

app.use(cors())

// API endpoint to get all products
app.get('/api/data', (req, res) => {
    res.json(data);
  });
  
  // API endpoint to get a specific product by ID
  app.get('/api/data/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = data.find((p) => p.id === productId);
  
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(product);
    }
  });
  
 
app.listen(PORT,()=>{
    console.log('listening')
})