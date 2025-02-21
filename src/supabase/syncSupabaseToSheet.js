import { GoogleSpreadsheet } from 'google-spreadsheet';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

import { supabase } from "./supabaseClient";

export async function syncData() {
    try {
        console.log('📡 Mengambil data dari Supabase...');
        const { data, error } = await supabase.from('kegiatan').select('*');

        if (error) throw error;
        console.log(`✅ Data Supabase diambil: ${data.length} baris`);

        const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID);
        const credentials = JSON.parse(fs.readFileSync(process.env.GOOGLE_SERVICE_ACCOUNT_JSON, 'utf8'));

        await doc.useServiceAccountAuth(credentials);
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];

        console.log('📝 Mengupdate Google Sheets...');
        await sheet.clear();
        await sheet.setHeaderRow(['ID', 'Nama', 'Bagian', 'Tanggal', 'Dana', 'Penanggung Jawab', 'Pengawas1', 'Pengawas2', 'Pengawas3']);

        for (const row of data) {
            await sheet.addRow({
                ID: row.id,
                Nama: row.nama,
                Bagian: row.bagian,
                Tanggal: row.tanggal_pelak,
                Dana: row.dana,
                'Penanggung Jawab': row.penanggung_,
                Pengawas1: row.pengawas1,
                Pengawas2: row.pengawas2,
                Pengawas3: row.pengawas3
            });
        }

        console.log('✅ Google Sheets diperbarui!');
    } catch (err) {
        console.error('❌ Error sinkronisasi:', err);
    }
}
