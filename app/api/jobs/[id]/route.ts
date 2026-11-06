import { handle,context,json,checkOrigin,body,action,contact } from '@/lib/server';
export async function POST(r:Request,{params}:{params:Promise<{id:string}>}) {return handle(async()=>{checkOrigin(r);return json(await action(await context(r),(await params).id,await body(r)));});}
export async function GET(r:Request,{params}:{params:Promise<{id:string}>}) {return handle(async()=>json(await contact(await context(r),(await params).id)));}
