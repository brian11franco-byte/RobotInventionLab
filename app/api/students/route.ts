import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { nickname } = await req.json();
    if (!nickname || nickname.trim().length < 2) {
      return NextResponse.json({ error: "Nickname too short" }, { status: 400 });
    }

    const student = await prisma.student.upsert({
      where: { nickname: nickname.trim() },
      create: { nickname: nickname.trim() },
      update: {},
    });

    let progress = await prisma.progress.findUnique({ where: { studentId: student.id } });
    if (!progress) {
      progress = await prisma.progress.create({
        data: { studentId: student.id },
      });
    }

    return NextResponse.json({ student, progress });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
