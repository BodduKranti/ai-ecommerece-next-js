import workflow from "@/app/src/ai/graph";
export const runtime = 'nodejs'
export async function POST(req: Request) {
    const body = await req.json();

    const result = await workflow.invoke({
        input: body.message,
    });

    console.log("Workflow Result:", result);
    // return NextResponse.json(result, { status: response?.status });

    return Response.json(result);
}