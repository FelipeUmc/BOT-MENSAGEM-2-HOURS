import { Client, GatewayIntentBits } from "discord.js";

process.on("uncaughtException", (err) => {
  console.error("[uncaughtException]", err);
});

process.on("unhandledRejection", (reason) => {
  console.error("[unhandledRejection]", reason);
});

const CHANNEL_IDS = [
  "1444835887610593430",
  "1301227007128109126",
  "1478831868563689623",
  "1438352989067808788",
];

const INTERVAL_MS = 2 * 60 * 60 * 1000;

const MESSAGE = `🚨 ATENÇÃO! 🚨

Todas as trocas e vendas devem ser realizadas EXCLUSIVAMENTE no canal:

👉 <#1438205342449270874>

💜 Isso garante mais segurança para todos
💜 Evita golpes e problemas nas negociações

⚠️ Qualquer negociação feita fora desse canal será por sua conta e risco.

Respeite as regras e mantenha o servidor organizado!`;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

async function sendReminders() {
  for (const channelId of CHANNEL_IDS) {
    try {
      const channel = await client.channels.fetch(channelId);
      if (!channel) {
        console.error(`[ERROR] Channel not found: ${channelId}`);
        continue;
      }
      await channel.send(MESSAGE);
      console.log(`[OK] Message sent to channel ${channelId}`);
    } catch (err) {
      console.error(`[ERROR] Failed to send to channel ${channelId}:`, err.message);
    }
  }
}

client.once("ready", async () => {
  console.log(`[BOT] Logged in as ${client.user.tag}`);

  await sendReminders();

  setInterval(sendReminders, INTERVAL_MS);
});

client.login(process.env.TOKEN);
