import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const donation = {
                donator_name: req.body.donator_name,
                amount: req.body.amount_raw,
                message: req.body.message || '-',
                timestamp: new Date().toISOString()
            };

            let donations = await kv.get('donations') || [];
            donations.push(donation);
            await kv.set('donations', donations);

            return res.status(200).json({ success: true });
        } catch (error) {
            console.error('Webhook error:', error);
            return res.status(500).json({ error: error.message });
        }
    }
    return res.status(405).json({ error: 'Method not allowed' });
}
