import { getNeonAuth } from "@/lib/auth/neon-server";

export async function GET(
  request: Request,
  context: { params: Promise<{ path: string[] }> }
) {
  const { GET } = getNeonAuth().handler();
  return GET(request, context);
}

export async function POST(
  request: Request,
  context: { params: Promise<{ path: string[] }> }
) {
  const { POST } = getNeonAuth().handler();
  return POST(request, context);
}
