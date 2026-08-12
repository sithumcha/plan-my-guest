export interface WhatsAppMessagePayload {
  to: string; // phone number e.g. 94771234567
  guestName: string;
  coupleNames: string;
  invitationUrl: string;
}

export async function sendWhatsAppInvite(payload: WhatsAppMessagePayload) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  const formattedPhone = payload.to.replace(/[^0-9]/g, '');

  const messageText = `Warm greetings ${payload.guestName}! 🌸\n\nYou are cordially invited to celebrate the wedding of ${payload.coupleNames}.\n\nPlease view your personal invitation and confirm your RSVP here:\n${payload.invitationUrl}\n\nWe look forward to sharing our special day with you! 💕`;

  // If WhatsApp API credentials are not set, return simulated success log
  if (!token || !phoneNumberId || token.startsWith('EAAG...')) {
    console.log(`[SIMULATED WHATSAPP API] Sent invite to ${formattedPhone}: "${messageText}"`);
    return {
      success: true,
      simulated: true,
      messageId: `sim_msg_${Date.now()}`,
      phone: formattedPhone,
      text: messageText,
    };
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: formattedPhone,
          type: 'text',
          text: {
            preview_url: true,
            body: messageText,
          },
        }),
      }
    );

    const data = await response.json();
    return { success: response.ok, data };
  } catch (error) {
    console.error('WhatsApp API Error:', error);
    return { success: false, error: (error as Error).message };
  }
}
