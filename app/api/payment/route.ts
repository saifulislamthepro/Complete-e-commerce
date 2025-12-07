import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";



export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const { amount, tran_id } = body;

  const order = await Order.findOne({tran_id: tran_id});
  // Make sure these are correct for your app
  const BASE_URL = process.env.PAYMENT_BASE_URL;

  // Create URL-encoded form body (REQUIRED!)
  const formData = new URLSearchParams();

  //-- Mandatory Fields --
  formData.append("store_id", `${process.env.SSLCOMMERZ_STORE_ID}`);
  formData.append("store_passwd", `${process.env.SSLCOMMERZ_STORE_PASSWORD}`);
  formData.append("total_amount", amount.toString());
  formData.append("currency", "BDT");
  formData.append("tran_id", tran_id);

  formData.append("success_url", `${BASE_URL}/payment/success`);
  formData.append("ipn_url", `${BASE_URL}/payment/ipn`);
  formData.append("fail_url", `${BASE_URL}/payment/fail`);
  formData.append("cancel_url", `${BASE_URL}/payment/cancel`);

  //-- Customer Information (MANDATORY) --
  formData.append("cus_name", order.firstName + " " + order.lastName);
  formData.append("cus_email", order.email);
  formData.append("cus_add1", order.address);
  formData.append("cus_add2", order.address);
  formData.append("cus_city", order.city);
  formData.append("cus_state", order.state);
  formData.append("cus_postcode", order.postcode);
  formData.append("cus_country", "Bangladesh");
  formData.append("cus_phone", order.phone);
  formData.append("cus_fax", order.phone);

  //-- Shipment Information (MANDATORY even if no shipping) --
  formData.append("ship_name", order.firstName + " " + order.lastName);
  formData.append("ship_add1", order.address);
  formData.append("ship_add2", order.address);
  formData.append("ship_city", order.city);
  formData.append("ship_state", order.state);
  formData.append("ship_postcode", order.postcode);
  formData.append("ship_country", "Bangladesh");

  //-- Product Information (MANDATORY) --
  formData.append("shipping_method", "Courier");
  formData.append("product_name", order.items.map((item: {title: string}) => item.title).join(", "));
  formData.append("product_category", "Clothing");
  formData.append("product_profile", "general");

  //-- OPTIONAL Fields (recommended) --
  formData.append("value_a", tran_id);
  formData.append("value_b", "extra1");
  formData.append("value_c", "extra2");
  formData.append("value_d", "extra3");

  try {
    const response = await fetch(
      `${process.env.SSLCOMMERZ_API_URL}`,
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
