import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { phoneNumbers } = req.body; // List of phone numbers
    const token = process.env.WHATSAPP_API_TOKEN;

    try {
      const results = await Promise.all(
        phoneNumbers.map(async (phone) => {
          const response = await axios.post(
            `https://graph.facebook.com/v21.0/482496121617305/messages`,
            {
              messaging_product: "whatsapp",
              to: phone,
              type: "template",
              template: {
                name: "ujustbe", 
                language: { code: "en_US" }, 
                components: [
                  {
                    type: "body",
                    parameters: [], // Add parameters if needed
                  },
                ],
              },
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          return { phone, status: "sent", response: response.data };
        })
      );

      res.status(200).json({ message: "Messages sent", results });
    } catch (error) {
      console.error("Error sending messages:", error.response.data);
      res.status(500).json(error.response.data);
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
