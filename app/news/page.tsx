import {PageShell} from '@/components/site';
import {listContent} from '@/lib/data';
import Link from 'next/link';
export const dynamic='force-dynamic';
export const metadata={title:'NEWS | 미아트컴퍼니'};
export default async function Page(){const items=await listContent('news');return <PageShell eyebrow="NEWS & NOTICES" title="미아트컴퍼니의 소식" description="공연과 교육, 새로운 만남의 소식을 전합니다."><section className="section">{items.length?items.map(item=><Link key={item.id} href={'/news/'+item.id} className="news-row"><span>{item.created_at.slice(0,10)}</span><h2>{item.title}</h2><span>↗</span></Link>):<div className="empty-state"><h3>등록된 소식이 없습니다.</h3><p>새로운 공연과 교육 소식을 이곳에서 전하겠습니다.</p></div>}</section></PageShell>}
