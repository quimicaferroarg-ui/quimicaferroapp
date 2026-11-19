// Aviso por WhatsApp al local cuando entra un pedido (vía CallMeBot).
// Corre en Vercel como función del servidor, así la apikey no queda a la vista.
//
// Configuración en Vercel → Settings → Environment Variables:
//   CALLMEBOT_PHONE  = número que recibe el aviso, con código de país, ej: 5491154647972
//   CALLMEBOT_APIKEY = apikey que manda el bot de CallMeBot a ese número
// Para avisar a más de un número: separarlos con coma en ambas variables, en el mismo orden.
// Si las variables no están cargadas, no hace nada (el pedido igual llega por mail).

const MAX_TEXT = 1500;

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ ok: false });
    return;
  }

  const phones = (process.env.CALLMEBOT_PHONE || "").split(",").map((s) => s.trim()).filter(Boolean);
  const keys = (process.env.CALLMEBOT_APIKEY || "").split(",").map((s) => s.trim()).filter(Boolean);
  if (phones.length === 0 || phones.length !== keys.length) {
    res.status(200).json({ ok: false, reason: "not-configured" });
    return;
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  const text = String((body && body.text) || "").slice(0, MAX_TEXT).trim();
  if (!text) {
    res.status(400).json({ ok: false });
    return;
  }

  const results = await Promise.all(
    phones.map(async (phone, i) => {
      const url =
        "https://api.callmebot.com/whatsapp.php?phone=" + encodeURIComponent(phone) +
        "&text=" + encodeURIComponent(text) +
        "&apikey=" + encodeURIComponent(keys[i]);
      try {
        const r = await fetch(url, { signal: AbortSignal.timeout(10000) });
        return r.ok;
      } catch {
        return false;
      }
    })
  );

  res.status(200).json({ ok: results.every(Boolean) });
};
