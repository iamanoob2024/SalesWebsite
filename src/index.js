export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method === "POST") {
      try {
        const formData = await request.formData();
        const payload = {
          name: formData.get("name"),
          org: formData.get("organization"),
          email: formData.get("email"),
          date: new Date().toLocaleDateString(),
          expires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toLocaleDateString()
        };

        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "courses@claritysystems.work",
            to: payload.email,
            subject: `Enquiry Received: ${payload.org}`,
            html: `Dear ${payload.name}, your training documents are attached.`,
            attachments: [
              { filename: "Trainer_Profile.pdf", path: "https://claritysystems.work/assets/profile.pdf" },
              { filename: "Course_Schedule.pdf", path: "https://claritysystems.work/assets/schedule.pdf" }
            ]
          }),
        });

        await fetch(`https://api.telegram.org/bot${env.TELEGRAM_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: env.TELEGRAM_CHAT_ID,
            text: `New Lead: ${payload.name} (${payload.org})\nEmail: ${payload.email}`
          }),
        });

        return new Response("Success", { status: 200, headers: corsHeaders });
      } catch (err) {
        return new Response(err.message, { status: 500, headers: corsHeaders });
      }
    }
    return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
  },
};
