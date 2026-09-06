import {env} from 'cloudflare:workers';
import {getChatGPTUser} from '@/app/chatgpt-auth';
export async function isAdmin(){const user=await getChatGPTUser();const email=(env as unknown as {ADMIN_EMAIL?:string}).ADMIN_EMAIL?.trim().toLowerCase();return !!email&&!!user&&user.email.toLowerCase()===email}
export function sameOrigin(request:Request){const origin=request.headers.get('origin');return !!origin&&origin===new URL(request.url).origin}
