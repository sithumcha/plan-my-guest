import { NextResponse } from 'next/server';
import { generatePayHereHash } from '@/lib/payhere';
import { getCurrentUser } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { plan, amount, currency } = await req.json();
    const user = await getCurrentUser();

    const merchantId = process.env.PAYHERE_MERCHANT_ID || '123456';
    const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET || '4XXXXXXXXXXXXXXX';
    const orderId = `PMG_SUB_${Date.now()}`;
    const payAmount = Number(amount) || 9900;
    const payCurrency = currency || 'LKR';

    const hash = generatePayHereHash(merchantId, orderId, payAmount, payCurrency, merchantSecret);

    const payHerePayload = {
      sandbox: process.env.PAYHERE_MODE !== 'live',
      merchant_id: merchantId,
      return_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/dashboard/billing?status=success`,
      cancel_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/dashboard/billing?status=cancel`,
      notify_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/billing/webhook`,
      order_id: orderId,
      items: `Plan My Guest Premium Package - ${plan || 'Pro'}`,
      currency: payCurrency,
      amount: payAmount.toFixed(2),
      hash: hash,
      first_name: (user?.name || 'Groom').split(' ')[0] || 'Groom',
      last_name: (user?.name || 'Bride').split(' ')[1] || 'Bride',
      email: user?.email || 'couple@plansite.lk',
      phone: '+94771234567',
      address: '100 Galle Road',
      city: 'Colombo',
      country: 'Sri Lanka',
    };

    return NextResponse.json({ success: true, payHerePayload });
  } catch (error) {
    console.error('PayHere Checkout error:', error);
    return NextResponse.json({ error: 'Failed to initiate billing session' }, { status: 500 });
  }
}
