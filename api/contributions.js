// Serverless function to handle contributions
import { Redis } from '@upstash/redis';

// Initialize Redis client using environment variables
// Vercel will automatically inject these from your project settings
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    switch (req.method) {
      case 'GET':
        // Get all contributions
        const contributions = await redis.get('ai-fi-contributions') || [];
        return res.status(200).json(contributions);
      
      case 'POST':
        // Add a new contribution
        const newContribution = {
          ...req.body,
          id: req.body.id || Date.now().toString(),
          date: req.body.date || new Date().toISOString()
        };
        
        // Get existing contributions
        let existingContributions = await redis.get('ai-fi-contributions') || [];
        
        // Add new contribution
        existingContributions.push(newContribution);
        
        // Save back to Redis
        await redis.set('ai-fi-contributions', existingContributions);
        
        return res.status(201).json(newContribution);
      
      case 'DELETE':
        // Delete a contribution by ID
        const { id } = req.query;
        
        // Get existing contributions
        let currentContributions = await redis.get('ai-fi-contributions') || [];
        
        // Filter out the contribution to delete
        const updatedContributions = currentContributions.filter(c => c.id !== id);
        
        // If nothing was removed, return 404
        if (currentContributions.length === updatedContributions.length) {
          return res.status(404).json({ error: 'Contribution not found' });
        }
        
        // Save back to Redis
        await redis.set('ai-fi-contributions', updatedContributions);
        
        return res.status(200).json({ success: true });
      
      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}