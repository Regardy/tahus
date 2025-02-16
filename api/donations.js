import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const donations = await kv.get('donations') || [];
            return res.status(200).json(donations.slice(-5).reverse());
        } catch (error) {
            console.error('API error:', error);
            return res.status(500).json({ error: error.message });
        }
    }
    return res.status(405).json({ error: 'Method not allowed' });
}
