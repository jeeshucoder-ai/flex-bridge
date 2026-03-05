export default {
  async fetch(request) {
    const url = new URL(request.url);
    const fileId = url.searchParams.get('file'); 
    if (!fileId) return new Response("Flex Cinema: No File ID");

    // Yahan hum baad mein aapka Bot Token dalenge
    const botToken = "YOUR_BOT_TOKEN_HERE";
    const telegramUrl = `https://api.telegram.org/bot${botToken}/getFile?file_id=${fileId}`;

    const res = await fetch(telegramUrl);
    const data = await res.json();
    
    if(!data.ok) return new Response("Telegram Error: " + data.description);
    
    const filePath = data.result.file_path;
    return fetch(`https://api.telegram.org/file/bot${botToken}/${filePath}`);
  }
};
