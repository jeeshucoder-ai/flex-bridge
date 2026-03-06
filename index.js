export default {
  async fetch(request, env) {
    const botToken = env.BOT_TOKEN;
    if (request.method === "POST") {
      const update = await request.json();
      if (update.message) {
        const chatId = update.message.chat.id;
        const fileId = update.message.video?.file_id || update.message.document?.file_id || "No File";
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text: `🎯 **Flex Cinema ID:**\n\n\`${fileId}\``, parse_mode: "Markdown" })
        });
      }
      return new Response("OK");
    }
    return new Response("Bridge Running 🚀");
  }
};
