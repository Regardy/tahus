import express from 'express';
import bodyParser from 'body-parser';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STORAGE_FILE = path.join(__dirname, 'data', 'donations.json');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Webhook endpoint
app.post('/api/webhook-saweria', async (req, res) => {
    try {
        console.log('Received webhook:', req.body);
        
        const donation = {
            donator_name: req.body.donator_name,
            amount: req.body.amount_raw,
            message: req.body.message || '-',
            timestamp: new Date().toISOString()
        };

        if (!donation.donator_name || !donation.amount) {
            console.log('Invalid donation data:', donation);
            return res.status(400).json({ error: 'Invalid donation data' });
        }

        // Read existing donations
        let donations = [];
        try {
            const data = await readFile(STORAGE_FILE, 'utf8');
            donations = JSON.parse(data);
        } catch (err) {
            // File doesn't exist, start fresh
            console.log('Creating new donations file');
        }

        // Add new donation
        donations.push(donation);

        // Keep only last 100 donations
        if (donations.length > 100) {
            donations = donations.slice(-100);
        }

        // Save to file
        await writeFile(STORAGE_FILE, JSON.stringify(donations, null, 2));
        console.log('Donation saved:', donation);

        res.json({ success: true });
    } catch (err) {
        console.error('Webhook error:', err);
        res.status(500).json({ error: err.message });
    }
});

// Get donations endpoint
app.get('/api/donations', async (req, res) => {
    try {
        const data = await readFile(STORAGE_FILE, 'utf8');
        const donations = JSON.parse(data);
        res.json(donations.slice(-5).reverse());
    } catch (err) {
        res.json([]);
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
