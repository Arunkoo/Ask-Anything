import { NextResponse } from "next/server";

const Backend_Url = process.env.NEXT_PUBLIC_BACKEND_URL || 4000;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const apiRes = await fetch(`${Backend_Url}/ask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await apiRes.json();
    return NextResponse.json(data, { status: apiRes.status });
  } catch (err: any) {
    return NextResponse.json({
      error: "Some error occured",
    });
  }
}
