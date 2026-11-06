import { handle,context,json,checkOrigin,demoSeed } from '@/lib/server';
export async function POST(r:Request) {return handle(async()=>{checkOrigin(r);await demoSeed(await context(r));return json({ok:true});});}
