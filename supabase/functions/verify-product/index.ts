import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageUrl, serialNumber, brand, name } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Use AI to analyze the product image for authenticity
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: "You are an expert luxury product authenticator. Analyze product images for authenticity markers, craftsmanship quality, and potential counterfeiting signs. Provide a confidence score (0-100) and detailed analysis."
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Analyze this ${brand} ${name} product (Serial: ${serialNumber}). Assess:
1. Authenticity markers and details
2. Craftsmanship quality
3. Any red flags or concerns
4. Overall confidence score (0-100)

Provide response in JSON format: { "confidence": <number>, "authentic": <boolean>, "analysis": "<string>", "details": ["<detail1>", "<detail2>", ...] }`
              },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl
                }
              }
            ]
          }
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI gateway error:", aiResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI verification failed", details: errorText }),
        { 
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    const aiData = await aiResponse.json();
    const aiContent = aiData.choices?.[0]?.message?.content || "{}";
    
    // Parse AI response
    let verificationResult;
    try {
      // Extract JSON from the response (it might be wrapped in markdown code blocks)
      const jsonMatch = aiContent.match(/\{[\s\S]*\}/);
      verificationResult = jsonMatch ? JSON.parse(jsonMatch[0]) : {
        confidence: 0,
        authentic: false,
        analysis: "Failed to parse AI response",
        details: []
      };
    } catch (e) {
      console.error("Failed to parse AI response:", e);
      verificationResult = {
        confidence: 0,
        authentic: false,
        analysis: aiContent,
        details: ["AI analysis could not be parsed"]
      };
    }

    // Generate blockchain hash (simulated for demo - in production, this would interact with actual blockchain)
    const blockchainHash = `0x${Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')}`;

    // Generate digital twin metadata
    const digitalTwinData = {
      nft_id: `AO-NFT-${Date.now()}`,
      created_at: new Date().toISOString(),
      verification_timestamp: new Date().toISOString(),
      ai_confidence: verificationResult.confidence,
      blockchain_hash: blockchainHash,
      metadata: {
        brand,
        name,
        serial_number: serialNumber,
        verified: verificationResult.authentic,
        verification_method: "AI + Blockchain",
        image_url: imageUrl,
      },
      attributes: [
        { trait_type: "Authenticity Score", value: verificationResult.confidence },
        { trait_type: "Verification Method", value: "AI-Powered Image Analysis" },
        { trait_type: "Brand", value: brand },
        { trait_type: "Verified On", value: new Date().toLocaleDateString() }
      ]
    };

    return new Response(
      JSON.stringify({
        success: true,
        verification: verificationResult,
        blockchain_hash: blockchainHash,
        digital_twin: digitalTwinData,
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );

  } catch (error) {
    console.error("Error in verify-product:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error",
        success: false 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});
