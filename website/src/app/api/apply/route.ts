import { NextRequest, NextResponse } from "next/server";
import { applicationSchema } from "@/lib/schema";
import { saveApplication, getApplicationCount } from "@/lib/storage";
import { sendApplicationNotification } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 1. Validate payload with Zod
    const validationResult = applicationSchema.safeParse(body);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          success: false,
          message: "Please check your inputs and correct the highlighted fields.",
          errors: fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;
    const userId = body.userId as string | undefined;

    // Get client IP for persistent logging
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ipAddress = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    // 2. Persist submission to Supabase DB + local backup
    const storedApp = await saveApplication(data, ipAddress, userId);

    // 3. Dispatch Email Notification (Resend / Mock fallback)
    const emailResult = await sendApplicationNotification(data);

    return NextResponse.json(
      {
        success: true,
        message: "We've received your application — we'll review it and reach out within 24-48 hours!",
        applicationId: storedApp.id,
        simulatedEmail: emailResult.simulated ?? false,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[API Apply] Unexpected submission error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred while processing your application. Please try again or contact us directly.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const count = await getApplicationCount();
    return NextResponse.json({
      status: "ok",
      totalApplicants: count,
      communityName: "Peercuit",
    });
  } catch (error) {
    return NextResponse.json({ status: "error", message: "Failed to fetch stats" }, { status: 500 });
  }
}
