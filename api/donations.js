import { donations } from './storage';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Return last 5 donations, newest first
        res.status(200).json(donations.slice(-5).reverse());
    } catch (err) {
        res.status(200).json([]);
    }
}
