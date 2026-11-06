import {env} from 'cloudflare:workers';
import {handle,context,db,listJobs} from '@/lib/server';
import {fail} from '@/lib/domain';
export async function GET(r:Request,{params}:{params:Promise<{id:string}>}) {return handle(async()=>{
 const c=await context(r);const {id}=await params;
 const row=await db().prepare('SELECT owner_id,scope FROM uploads WHERE id=?').bind(id).first<{owner_id:string,scope:string}>();
 if(!row||row.scope!==c.scope)fail('Photo not found.',404);
 if(row.owner_id!==c.id){
  const path=`/api/files/${id}`;const jobs=await listJobs(c);
  let allowed=jobs.some(j=>j.photo===path||j.contract?.photo===path||j.charges.some(x=>x.photo===path));
  if(!allowed&&jobs.some(j=>j.workerId&&((j.customerId===c.id&&j.workerId===row.owner_id)||(j.workerId===c.id&&j.customerId===row.owner_id)))){
   const profile=await db().prepare('SELECT body FROM profiles WHERE id=? AND scope=?').bind(row.owner_id,c.scope).first<{body:string}>();
   allowed=!!profile&&JSON.parse(profile.body).photo===path;
  }
  if(!allowed)fail('Photo access denied.',403);
 }
 const obj=await env.BUCKET!.get(id);if(!obj)fail('Photo not found.',404);
 return new Response(obj.body,{headers:{'Content-Type':obj.httpMetadata?.contentType||'image/jpeg','Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'}});
 });}
