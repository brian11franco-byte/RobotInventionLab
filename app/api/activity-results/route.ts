import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { studentId, activityType, score } = await req.json();
    const result = await prisma.activityResult.create({
      data: { studentId, activityType, score },
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
