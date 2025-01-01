import express from "express";
import crypto from "crypto";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Add error handling for missing env variables
if (!process.env.BANK_WEBHOOK_URL) {
  throw new Error('BANK_WEBHOOK_URL is not defined in environment variables');
}

app.post("/gettoken", async (req, res) => {

    const {userId, amount}:{
        userId: string,
        amount: number
    } = await req.body
    console.log(userId, amount);

    const randomString = crypto.randomBytes(16).toString('hex');
    const token = `${Date.now()}:${userId}:${amount}:${randomString}`;
    res.json({ token });
})

const webhookQueue: { payload: {token: string, amount: number, userId: string}; retries: number }[] = []; // In-memory queue for unsent webhook payloads

const MAX_RETRIES = 5; // Maximum number of retries
const RETRY_INTERVAL = 60000; // Retry every 60 seconds

// Function to simulate hitting the webhook
const triggerWebhook = async (payload: {token: string, amount: number, userId: string}, retries = 0) => {
  try {
    const webhookUrl = process.env.BANK_WEBHOOK_URL;
    console.log('Attempting webhook to:', webhookUrl); 
    
    fetch(`${webhookUrl}`, { method: 'GET' })// Debug log

    const response = await fetch(`${webhookUrl}/hdfcwebhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Webhook failed with status: ${response.status}`);
    }

    console.log('Webhook succeeded:', payload.token);
  } catch (error: any) {
    console.error(`Error hitting webhook: ${error.message}`);
    if (retries < MAX_RETRIES) {
      console.log(`Retrying webhook for ${payload.token} (${retries + 1}/${MAX_RETRIES})`);

      // Schedule retry
      setTimeout(() => {
        triggerWebhook(payload, retries + 1);
      }, RETRY_INTERVAL);
    } else {
      console.error(`Failed after ${MAX_RETRIES} attempts. Adding to queue: ${payload.token}`);
      webhookQueue.push({ payload, retries });
    }
  }
};

// Retry failed webhooks periodically
setInterval(() => {
  for (let i = 0; i < webhookQueue.length; i++) {
    const { payload, retries } = webhookQueue[i];
    console.log(`Retrying queued webhook: ${payload.token}`);
    triggerWebhook(payload, retries).then(() => {
      // Remove successful payloads from queue
      webhookQueue.splice(i, 1);
      i--;
    });
  }
}, RETRY_INTERVAL);

// Endpoint to process a transaction and trigger webhook
app.post('/process-transaction', async (req, res) => {
  const { token, amount, userId} = req.body;


  // Simulated payload sent to webhook
  const payload = {
    token,
    amount,
    userId,
  };

  // Trigger webhook
  await triggerWebhook(payload);

  res.json({ message: 'Transaction processed' });
});

app.listen(3003, () => {
  console.log('Server is running on port 3003');
});


