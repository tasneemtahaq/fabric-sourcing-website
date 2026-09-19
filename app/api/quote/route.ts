
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const {
      name,
      company,
      country,
      email,
      whatsapp,
      websiteType,
      requirements,
    } = data;

    // Basic validation
    if (!name || !whatsapp || !websiteType) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required fields.",
        },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error("DISCORD_WEBHOOK_URL is missing");

      return NextResponse.json(
        {
          success: false,
          message: "Server configuration error.",
        },
        { status: 500 }
      );
    }

    // Send quote to Discord
    const discordResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "Website Quote Bot",
        embeds: [
          {
            title: "🌐 New Website Quote",
            color: 3447003,
            fields: [
              {
                name: "👤 Name",
                value: name || "Not provided",
                inline: true,
              },
              {
                name: "🏢 Company",
                value: company || "Not provided",
                inline: true,
              },
              {
                name: "🌍 Country",
                value: country || "Not provided",
                inline: true,
              },
              {
                name: "📧 Email",
                value: email || "Not provided",
                inline: true,
              },
              {
                name: "📱 WhatsApp",
                value: whatsapp || "Not provided",
                inline: true,
              },
              {
                name: "💻 Website Type",
                value: websiteType || "Not provided",
                inline: false,
              },
              {
                name: "📝 Requirements",
                value: requirements || "No additional requirements",
                inline: false,
              },
            ],
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });

    if (!discordResponse.ok) {
      console.error(
        "Discord webhook error:",
        await discordResponse.text()
      );

      return NextResponse.json(
        {
          success: false,
          message: "Unable to send quote request.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Quote request submitted successfully!",
    });
  } catch (error) {
    console.error("Quote API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}

