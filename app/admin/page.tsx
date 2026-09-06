import {PageShell} from '@/components/site';
import {isAdmin} from '@/lib/auth';
import {getChatGPTUser,chatGPTSignInPath} from '@/app/chatgpt-auth';
import {database,listContent,getSettings,Inquiry} from '@/lib/data';
import Admin from './editor';
export const dynamic='force-dynamic';
export const metadata={title:'콘텐츠 관리 | 미아트컴퍼니',robots:{index:false,follow:false}};
export default async function Page(){const user=await getChatGPTUser();if(!await isAdmin())return <PageShell eyebrow="ADMIN" title="콘텐츠 관리" description="관리자로 등록된 계정만 이용할 수 있습니다."><section className="section">{!user?<a className="submit-button" href={chatGPTSignInPath('/admin')} target="_top">ChatGPT로 로그인</a>:<p>이 계정에는 관리자 권한이 없습니다. 사이트 운영자에게 관리자 이메일 연결을 요청해 주세요.</p>}</section></PageShell>;const inquiries=await database().prepare('SELECT * FROM inquiries ORDER BY created_at DESC').all<Inquiry>();return <PageShell eyebrow="ADMIN" title="미아트컴퍼니 콘텐츠 관리" description="공연과 소식, 연락처를 등록하고 접수된 문의를 확인합니다."><section className="section"><Admin items={[...await listContent(),...await listContent('news')]} inquiries={inquiries.results} settings={await getSettings()}/></section></PageShell>}
