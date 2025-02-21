import express from 'express';
import bodyParser from 'body-parser';
import { syncData } from './syncSupabaseToSheet.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
    console.log('🔔 Webhook diterima dari Supabase:', req.body);

    try {
        await syncData();  // Sinkronisasi data ke Google Sheets
        res.status(200).send({ success: true, message: 'Data berhasil diperbarui!' });
    } catch (err) {
        console.error('❌ Error saat sinkronisasi:', err);
        res.status(500).send({ success: false, message: 'Gagal memperbarui data' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Webhook berjalan di port ${PORT}`));
