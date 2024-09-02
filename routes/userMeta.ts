import express from 'express';
import { getBot } from '../utils/helpers';

const router = express.Router()
const bot = getBot();

// Webhook endpoint to handle requests from the Web App
router.post('/profile-photo', async (req, res) => {
    const { userId } = req.body; // The Web App should send the user ID in the request

    try {
        const photos = await bot.telegram.getUserProfilePhotos(userId, 0, 1);
        if (photos.total_count > 0) {
            const fileId = photos.photos[0][0].file_id;
            const file = await bot.telegram.getFileLink(fileId);
            res.json({ success: true, photoUrl: file.href });
        } else {
            res.json({ success: false, message: "No profile photo available." });
        }
    } catch (error) {
        console.error('Error fetching profile photo:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

export default router;