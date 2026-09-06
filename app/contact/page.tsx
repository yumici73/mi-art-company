import {PageShell} from '@/components/site';
import {getSettings,safeImage} from '@/lib/data';
import ContactForm from './form';
export const dynamic='force-dynamic';
export const metadata={title:'CONTACT | 미아트컴퍼니'};
export default async function Page(){const settings=await getSettings();return <PageShell eyebrow="CONTACT" title="당신의 이야기를 들려주세요." description="공연부터 예술교육까지, 함께 만들고 싶은 만남을 이야기해 주세요."><section className="section contact-layout"><aside><h2>함께 만드는<br/>예술의 다음 장.</h2><p>공연 · 기획/연출<br/>전통춤 공연과 교육<br/>스토리댄스 · 기관 프로그램<br/>강사교육 · 협업</p>{settings.email&&<p><a href={'mailto:'+settings.email}>{settings.email}</a></p>}{settings.phone&&<p><a href={'tel:'+settings.phone.replace(/[^+0-9]/g,'')}>{settings.phone}</a></p>}{settings.address&&<p>{settings.address}</p>}{['instagram','youtube'].map(k=>safeImage(settings[k])&&<p key={k}><a href={settings[k]} target="_blank" rel="noreferrer">{k==='instagram'?'Instagram':'YouTube'} ↗</a></p>)}</aside><ContactForm/></section></PageShell>}
