import { handle,context,json,checkOrigin,body,createJob } from '@/lib/server';
export async function POST(r:Request) {return handle(async()=>{checkOrigin(r);return json({job:await createJob(await context(r),await body(r))},201);});}
