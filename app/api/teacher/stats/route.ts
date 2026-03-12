import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const students = await prisma.student.findMany({
      include: {
        progress: true,
        results: true,
      },
      orderBy: { createdAt: "desc" },
    });

    type StudentWithRelations = typeof students[number];
    const leaderboard = students
      .filter((s: StudentWithRelations) => s.progress)
      .sort((a: StudentWithRelations, b: StudentWithRelations) => (b.progress?.xpPoints ?? 0) - (a.progress?.xpPoints ?? 0))
      .map((s: StudentWithRelations) => ({
        nickname: s.nickname,
        xpPoints: s.progress?.xpPoints ?? 0,
        grammarLevel: s.progress?.grammarLevel ?? 1,
        activityCount: s.results.length,
      }));

    const activityBreakdown: Record<string, { count: number; totalScore: number }> = {};
    for (const s of students) {
      for (const r of s.results) {
        if (!activityBreakdown[r.activityType]) {
          activityBreakdown[r.activityType] = { count: 0, totalScore: 0 };
        }
        activityBreakdown[r.activityType].count++;
        activityBreakdown[r.activityType].totalScore += r.score;
      }
    }

    const avgScores = Object.entries(activityBreakdown).map(([type, data]) => ({
      type,
      avgScore: data.count > 0 ? Math.round(data.totalScore / data.count) : 0,
      totalActivities: data.count,
    }));

    return NextResponse.json({
      totalStudents: students.length,
      leaderboard,
      avgScores,
    });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
