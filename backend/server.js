import dotenv from 'dotenv';
import Stripe from 'stripe';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure dotenv before any other imports
dotenv.config();
// Debug environment variables
console.log('Server Environment Variables Check:');
console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
console.log('MONGO_URL exists:', !!process.env.MONGO_URL);
console.log('PORT:', process.env.PORT);
console.log('STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY);
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import vegetableRoutes from './routes/vegetableRoutes.js';
import fruitRoutes from './routes/FruitsRoutes.js';
import provisionRoutes from './routes/ProvisionsRoutes.js';  
import connectDB from './config/db.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../eccomerce-platform')));
// Connect to database
connectDB();
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/vegetables', vegetableRoutes);
app.use('/api/fruits', fruitRoutes);
app.use('/api/provisions', provisionRoutes);


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
app.post('/api/checkout', async (req, res) => {
  let { totalAmount, totalQuantity } = req.body;
  console.log(totalAmount, totalQuantity);                                                                                                                                                                                                  

  if (
    typeof totalAmount !== 'number' ||
    typeof totalQuantity !== 'number' ||
    totalAmount <= 0 ||
    totalQuantity <= 0
  ) {
    return res.status(400).json({ error: 'Invalid totalAmount or totalQuantity' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Cart (${totalQuantity} items)`,
            },
            unit_amount: Math.round(totalAmount), // Stripe expects amount in cents
          },
          quantity: 1, // All items as a single bundle
        },
      ],
      success_url: 'https://eccomerce-backend-11dr.onrender.com/success',
      cancel_url: 'https://eccomerce-backend-11dr.onrender.com/cancel',
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: 'Stripe session creation failed' });
  }
});

app.get('/success',(req,res)=>{
  res.sendFile(path.join(__dirname, './success.html'));
});

app.get('/cancel',(req,res)=>{
  res.sendFile(path.join(__dirname, './cancel.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


