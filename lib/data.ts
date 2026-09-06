import {env} from 'cloudflare:workers';
export type Content={id:string;kind:string;title:string;year:number;category:string;description:string;role:string;location:string;organizer:string;participants:string;image:string;gallery:string;video:string;related:string;featured:number;created_at:string};
export type Inquiry={id:string;name:string;organization:string;phone:string;email:string;category:string;message:string;status:string;created_at:string};
export function database(){return (env as unknown as {DB:D1Database}).DB}
export async function listContent(kind='project'){const result=await database().prepare('SELECT * FROM content WHERE kind = ? ORDER BY year DESC, created_at DESC').bind(kind).all<Content>();return result.results}
export async function getContent(id:string){return database().prepare('SELECT * FROM content WHERE id = ?').bind(id).first<Content>()}
export async function getSettings(){const row=await database().prepare('SELECT value FROM settings WHERE id = ?').bind('contact').first<{value:string}>();return row?JSON.parse(row.value) as Record<string,string>:{} as Record<string,string>}
export function safeImage(value:unknown){if(typeof value!=='string'||!value)return '';try{const u=new URL(value);return u.protocol==='https:'?u.href:''}catch{return ''}}
export function videoEmbed(value:string){try{const u=new URL(value);const h=u.hostname.replace(/^www\./,'');if(h==='youtu.be'&&/^\/[\w-]{11}$/.test(u.pathname))return 'https://www.youtube-nocookie.com/embed/'+u.pathname.slice(1);if(h==='youtube.com'){const id=u.searchParams.get('v')||u.pathname.split('/').pop()||'';if(/^[\w-]{11}$/.test(id))return 'https://www.youtube-nocookie.com/embed/'+id}if(h==='vimeo.com'&&/^\/\d+$/.test(u.pathname))return 'https://player.vimeo.com/video'+u.pathname;}catch{}return ''}
