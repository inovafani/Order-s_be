import { Router } from 'express';
import QRCode from 'qrcode';
import prisma from '../lib/prisma.js';
import { table } from 'console';
const router = Router();

// Generate QR code for a table
router.get('/generate/:tableId', async (require, res) => {
  const { tableId } = require.params;

  // Loaded url inside QR code
  const baseUrl = process.env.BASE_URL;
  const qrUrl = `${baseUrl}/menu?table=${tableId}`;

  try {
    const qrCode = await QRCode.toDataURL(qrUrl);
    res.json({ tableId, qrUrl, qrCode });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

router.post('/order', async (req, res) => {
  const { tableId, items, quantity } = req.body;
  try {
    const order = await prisma.order.create({
      data: {
        items,
        quantity,
        tableId: Number(tableId),
      },
    });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

export default router;
