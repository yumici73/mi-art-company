import {PageShell,FeatureRows} from '@/components/site';
import Link from 'next/link';
export const metadata={title:'PERFORMANCE | 미아트컴퍼니'};
export default function Page(){return <PageShell eyebrow="01 / PERFORMANCE" title="새로운 무대를 창작합니다." description="전통과 동시대의 감각을 연결하는 공연 · 기획 · 연출 · 안무 · 창작."><section className="section"><FeatureRows items={[{title:'공연과 창작',body:'몸과 움직임으로 동시대의 이야기를 풀어내는 창작 작품과 무용 공연.'},{title:'기획 · 연출 · 안무',body:'공연의 이야기와 무대 구성을 함께 설계하고, 작품의 감각을 몸짓으로 구체화합니다.'},{title:'융합예술과 지역 프로젝트',body:'다양한 예술 언어를 연결하는 융복합 프로젝트, 지역 축제와 문화 프로젝트를 함께 만듭니다.'}]}/><Link className="text-link" href="/archive?category=Performance">공연 아카이브 보기 ↗</Link></section></PageShell>}
