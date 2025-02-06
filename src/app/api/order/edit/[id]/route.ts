import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const { customerName , customerEmail , customerAddress } = await req.json();

    // Simulate saving to a database (Replace with real DB logic)
    console.log("Updated text:", customerAddress+customerEmail+customerName);

    return NextResponse.json({ success: true, updatedAddress:customerAddress,updatedName:customerName , updatedEmail:customerEmail });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update text" }, { status: 500 });
  }
}
