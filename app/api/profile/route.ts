import { handle,context,json,checkOrigin,body,saveProfile } from '@/lib/server';
export async function POST(r:Request) {return handle(async()=>{checkOrigin(r);const c=await context(r);return json({profile:await saveProfile(c,await body(r))});});}
