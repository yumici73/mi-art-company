import {PageShell} from '@/components/site';
import {listContent} from '@/lib/data';
import Archive from './archive';
export const dynamic='force-dynamic';
export const metadata={title:'ARCHIVE | 미아트컴퍼니'};
export default async function Page({searchParams}:{searchParams:Promise<{category?:string}>}){const params=await searchParams;return <PageShell eyebrow="OUR RECORDS" title="예술이 지나간 자리, 다음 이야기가 시작되는 곳." description="공연, 전통춤, 교육과 커뮤니티아트. 미아트컴퍼니의 활동을 모았습니다."><section className="section"><Archive items={await listContent()} initialCategory={params.category||'All'}/></section></PageShell>}
