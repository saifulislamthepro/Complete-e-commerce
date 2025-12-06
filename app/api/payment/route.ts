import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { amount, tran_id } = body;

  // Make sure these are correct for your app
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://kory-fluoroscopic-charolette.ngrok-free.dev";

  // Create URL-encoded form body (REQUIRED!)
  const formData = new URLSearchParams();

  //-- Mandatory Fields --
  formData.append("store_id", "smart6931a82839daf");
  formData.append("store_passwd", "smart6931a82839daf@ssl");
  formData.append("total_amount", amount.toString());
  formData.append("currency", "BDT");
  formData.append("tran_id", tran_id);

  formData.append("success_url", `${BASE_URL}/payment/success`);
  formData.append("fail_url", `${BASE_URL}/payment/fail`);
  formData.append("cancel_url", `${BASE_URL}/payment/cancel`);

  //-- Customer Information (MANDATORY) --
  formData.append("cus_name", "John Doe");
  formData.append("cus_email", "john@example.com");
  formData.append("cus_add1", "Dhaka");
  formData.append("cus_add2", "Dhaka");
  formData.append("cus_city", "Dhaka");
  formData.append("cus_state", "Dhaka");
  formData.append("cus_postcode", "1205");
  formData.append("cus_country", "Bangladesh");
  formData.append("cus_phone", "01711111111");
  formData.append("cus_fax", "01711111111");

  //-- Shipment Information (MANDATORY even if no shipping) --
  formData.append("ship_name", "John Doe");
  formData.append("ship_add1", "Dhaka");
  formData.append("ship_add2", "Dhaka");
  formData.append("ship_city", "Dhaka");
  formData.append("ship_state", "Dhaka");
  formData.append("ship_postcode", "1205");
  formData.append("ship_country", "Bangladesh");

  //-- Product Information (MANDATORY) --
  formData.append("shipping_method", "NO");
  formData.append("product_name", "Test Product");
  formData.append("product_category", "General");
  formData.append("product_profile", "general");

  //-- OPTIONAL Fields (recommended) --
  formData.append("value_a", tran_id);
  formData.append("value_b", "extra1");
  formData.append("value_c", "extra2");
  formData.append("value_d", "extra3");

  try {
    const response = await fetch(
      "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      }
    );

    const resData = await response.json();

    console.log("SSLCommerz Response:", resData);

    if (resData.status === "FAILED") {
      return NextResponse.json(
        { error: resData.failedreason || "Payment Failed" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      url: resData.GatewayPageURL,
      sessionKey: resData.sessionkey,
    });
  } catch (err) {
    console.error("SSLCommerz Error:", err);
    return NextResponse.json(
      { error: "SSLCommerz initiation error" },
      { status: 500 }
    );
  }
}
