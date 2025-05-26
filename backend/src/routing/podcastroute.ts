import express, { Request, Response } from 'express';
import { searchPodcasts } from '../services/podcastService';

const router = express.Router();

// Route handler for podcast search
router.get('/search', async (req: Request, res: Response) => {
    try {
        // Extract search term from query parameters
        const { term } = req.query;

        // Validate if search term exists
        if (!term) {
            return res.status(400).json({
                success: false,
                message: 'Search term is required'
            });
        }

        // Search for podcasts using the service
        const data = await searchPodcasts(term as string);

        // Return successful response with podcast data
        return res.status(200).json({
            success: true,
            data: data
        });

    } catch (error) {
        // Log the error for debugging
        console.error('Search error:', error);
        
        if (error instanceof Error && error.message === 'Search term is required') {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        // Return error response to client
        return res.status(500).json({
            success: false,
            message: 'Error occurred while searching',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});

export default router; 