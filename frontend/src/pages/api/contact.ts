// SSR endpoint — handles POST from the contact form
export const prerender = false;

import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, message } = data;

    // Validation
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Tous les champs sont requis.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Log server-side (always useful for demo)
    console.log('──────────────────────────────────────');
    console.log('📩 Nouveau message de contact reçu :');
    console.log(`   Nom    : ${name}`);
    console.log(`   Email  : ${email}`);
    console.log(`   Message: ${message}`);
    console.log('──────────────────────────────────────');

    // Send email via Resend
    const resendApiKey = import.meta.env.RESEND_API_KEY;
    const contactTo = import.meta.env.CONTACT_EMAIL || 'delivered@resend.dev';

    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      const result = await resend.emails.send({
        from: 'Une Rose Un Espoir <onboarding@resend.dev>',
        to: [contactTo],
        replyTo: email,
        subject: `[Contact] Message de ${name}`,
        html: `
          <h2>Nouveau message depuis le site</h2>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Message :</strong></p>
          <p>${message.replace(/\n/g, '<br/>')}</p>
        `,
      });

      if (result.error) {
        console.error('❌ Resend error:', JSON.stringify(result.error));
        return new Response(
          JSON.stringify({ error: `Erreur email: ${result.error.message}` }),
          { status: 502, headers: { 'Content-Type': 'application/json' } }
        );
      }
      console.log('✅ Email envoyé via Resend, id:', result.data?.id);
    } else {
      console.log('⚠️ RESEND_API_KEY non configurée — email non envoyé (simulation)');
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('❌ Erreur envoi contact :', error);
    return new Response(
      JSON.stringify({ error: 'Erreur serveur. Réessayez plus tard.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
