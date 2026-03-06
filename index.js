export default {
  async fetch(request, env) {
    const botToken = env.BOT_TOKEN;
    const url = new URL(request.url);

    // 1. Browser Test Link
    if (url.searchParams.has('file')) {
        const fileId = url.searchParams.get('file');
        return Response.redirect(`https://api.telegram.org/file/bot${botToken}/${fileId}`, 302);
    }

    // 2. Bot Message Handling
    if (request.method === "POST") {
      try {
        const update = await request.json();
        if (update.message) {
          const chatId = update.message.chat.id;
          const file_id = update.message.video?.file_id || update.message.document?.file_id || "No File ID";
          
          let responseText = `🎯 Flex Cinema World:\n\nID: \`${file_id}\``;
          
          await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: chatId, text: responseText, parse_mode: "Markdown" })
          });
        }
      } catch (e) {}
    }

    return new Response("Bridge is Active 🚀");
  }
};
