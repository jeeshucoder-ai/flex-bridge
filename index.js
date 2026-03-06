export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const fileId = url.searchParams.get('file');
    const botToken = env.BOT_TOKEN; // Aapka save kiya hua token yahan se load hoga

    if (!fileId) return new Response("Flex Cinema: No File ID Provided", { status: 400 });

    try {
      const getFile = await fetch(`https://api.telegram.org/bot${botToken}/getFile?file_id=${fileId}`);
      const data = await getFile.json();

      if (!data.ok) return new Response("Telegram Error: " + data.description, { status: 500 });

      const filePath = data.result.file_path;
      const streamUrl = `https://api.telegram.org/file/bot${botToken}/${filePath}`;

      // Ye link aapke Admin Panel mein Direct Video ki tarah kaam karega
      return Response.redirect(streamUrl, 302);
    } catch (e) {
      return new Response("Server Error: " + e.message, { status: 500 });
    }
  }
};
