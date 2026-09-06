import {notFound} from 'next/navigation';
import {PageShell} from '@/components/site';
import {getContent} from '@/lib/data';
export const dynamic='force-dynamic';
export async function generateMetadata({params}:{params:Promise<{id:string}>}){const item=await getContent((await params).id);return {title:item?item.title+' | 미아트컴퍼니':'소식을 찾을 수 없습니다'}}
export default async function Page({params}:{params:Promise<{id:string}>}){const item=await getContent((await params).id);if(!item||item.kind!=='news')notFound();return <PageShell eyebrow={'NEWS / '+item.created_at.slice(0,10)} title={item.title} description="미아트컴퍼니 소식"><article className="section detail">{item.image&&<img className="detail-image" src={item.image} alt={item.title}/>}<p className="body-copy">{item.description}</p></article></PageShell>}
