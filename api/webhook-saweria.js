let donations = [];

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Log the request body for debugging
        console.log('Received body:', req.body);

        // Handle both JSON and URL-encoded form data
        const donation = {
            donator_name: req.body.donator_name || req.query.donator_name,
            amount: req.body.amount_raw || req.query.amount_raw,
            message: req.body.message || req.query.message || '-'
        };

        if (!donation.donator_name || !donation.amount) {
            console.log('Invalid donation data:', donation);
            return res.status(400).json({ error: 'Invalid donation data' });
        }

        // Add new donation
        donations.push({
            ...donation,
            timestamp: new Date().toISOString()
        });

        res.status(200).json({
            success: true,
            timestamp: new Date().toISOString()
        });
    } catch (err) {
        console.error('Webhook error:', err);
        res.status(500).json({ error: err.message });
    }
}
