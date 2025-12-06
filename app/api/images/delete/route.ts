
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";



export async function DELETE(req: NextRequest) {

    const imgName = await req.json();
    
    
    // Extract just the filename from the URL
    const fileName = imgName.split("/").pop(); // e.g., image-123.png
    // Path to your local uploads folder
    const filePath = path.join(process.cwd(), "public", "uploads", fileName);

    // Delete file if exists
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log("File delete error:", err.message);
      } else {
        console.log("Image deleted:", fileName);
      }
    });

    return NextResponse.json({
      success: true,
      message: "Image deleted successfully",
      deleted: fileName
    });

  }