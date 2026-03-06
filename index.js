export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const botToken = env.BOT_TOKEN;

    // 1. Agar koi browser mein link khole (Stream/Download ke liye)
    const fileId = url.searchParams.get('file');
    if (fileId) {
      const getFile = await fetch(`https://api.telegram.org/bot${botToken}/getFile?file_id=${fileId}`);
      const data = await getFile.json();
      if (!data.ok) return new Response("Error", { status: 500 });
      return Response.redirect(`https://api.telegram.org/file/bot${botToken}/${data.result.file_path}`, 302);
    }

    // 2. Bot ko Smart banana (File ID reply dene ke liye)
    if (request.method === "POST") {
      const update = await request.json();
      if (update.message && (update.message.video || update.message.document)) {
        const file_id = update.message.video?.file_id || update.message.document?.file_id;
        const chatId = update.message.chat.id;
        const text = `🎯 Aapki File ID ye rahi:\n\n\`${file_id}\`\n\nIse copy karke Admin Panel mein lagao.`;
        
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text: text, parse_mode: "Markdown" })
        });
      }
      return new Response("OK");
    }

    return new Response("Flex Cinema Bridge is Live 🚀");
  }
};
