import { handle,context,json,listJobs } from '@/lib/server';
export const dynamic='force-dynamic';
export async function GET(r:Request) {return handle(async()=>{const c=await context(r);return json({profile:c.profile,jobs:c.profile?await listJobs(c):[],displayName:c.user.displayName,demo:c.demo});});}
