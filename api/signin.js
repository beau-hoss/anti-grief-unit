export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { badge } = req.body;
  if (!badge) return res.status(400).json({ error: 'Badge number required' });

  try {
    const webhookUrl = 'https://discord.com/api/webhooks/1491179416754061443/Wrdy9h4GTIlD7YYYa78wEWAuT1WEk0Jp7WSr-q3J5YBnxX5pVQ5aFIucAoURarhpMUyU';
    const message = {
      content: `🛡️ Officer **#${badge}** has signed ON DUTY.`,
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    });

    if (!response.ok) throw new Error('Failed to send to Discord');

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to connect to server' });
  }
}
