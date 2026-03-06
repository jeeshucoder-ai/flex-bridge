const { Buffer } = require('buffer');

module.exports = async (req, res) => {
  const botToken = process.env.BOT_TOKEN;

  // 1. Bot Message Handling (POST Request)
  if (req.method === 'POST') {
    const update = req.body;
    if (update && update.message) {
      const chatId = update.message.chat.id;
      const fileId = update.message.video?.file_id || update.message.document?.file_id;

      if (fileId) {
        const text = `🎯 **Flex Cinema ID:**\n\n\`${fileId}\``;
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text: text, parse_mode: 'Markdown' })
        });
      }
    }
    return res.status(200).send('OK');
  }

  // 2. Browser Stream Handling (GET Request)
  const fileId = req.query.file;
  if (fileId) {
    const getFile = await fetch(`https://api.telegram.org/bot${botToken}/getFile?file_id=${fileId}`);
    const data = await getFile.json();
    if (data.ok) {
      return res.redirect(`https://api.telegram.org/file/bot${botToken}/${data.result.file_path}`);
    }
  }

  res.send("Flex Cinema Bridge is Ready 🚀");
};
