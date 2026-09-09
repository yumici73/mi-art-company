// Build-time adapter for a read-only Vercel review deployment.
// Run only in a disposable checkout: Cloudflare source stays intact in Git.
import {readFileSync, writeFileSync} from 'node:fs';
const read = path => readFileSync(path, 'utf8');
const write = (path, value) => writeFileSync(path, value);
const pkg = JSON.parse(read('package.json'));
delete pkg.dependencies.vinext;
delete pkg.dependencies['react-server-dom-webpack'];
pkg.dependencies.next = '16.3.4';
pkg.dependencies.react = '19.2.8';
pkg.dependencies['react-dom'] = '19.2.8';
pkg.devDependencies = Object.fromEntries(Object.entries(pkg.devDependencies).filter(([name]) => ['@tailwindcss/postcss', '@types/node', '@types/react', '@types/react-dom', 'tailwindcss', 'typescript'].includes(name)));
pkg.scripts = {dev:'next dev', build:'next build --webpack', start:'next start'};
write('package.json', JSON.stringify(pkg, null, 2)+'\n');
const ts = JSON.parse(read('tsconfig.json'));
ts.compilerOptions.types = ['node'];
ts.compilerOptions.plugins = [{name:'next'}];
ts.exclude = ['node_modules', 'preview', 'db', 'drizzle.config.ts', 'vite.config.ts'];
write('tsconfig.json', JSON.stringify(ts, null, 2)+'\n');
write('postcss.config.mjs', "export default {plugins: {'@tailwindcss/postcss': {}}};\n");
let data = read('lib/data.ts').replace("import {env} from 'cloudflare:workers';", '');
const helpers = data.slice(data.indexOf('export function safeImage'));
const types = data.slice(0, data.indexOf('export function database'));
write('lib/data.ts', types + `
// No persistent database is connected to this review deployment.
export async function listContent(_kind='project'):Promise<Content[]>{return []}
export async function getContent(_id:string):Promise<Content|null>{return null}
export async function getSettings():Promise<Record<string,string>>{return {}}
` + helpers);
write('lib/auth.ts', `// Never trust Sites-specific identity headers on Vercel.
export async function isAdmin(){return false}
export function sameOrigin(request:Request){return request.headers.get('origin')===new URL(request.url).origin}
`);
write('app/admin/page.tsx', `import {PageShell} from '@/components/site';
export const metadata={title:'콘텐츠 관리 | 미아트컴퍼니',robots:{index:false,follow:false}};
export default function Page(){return <PageShell eyebrow="ADMIN" title="콘텐츠 관리" description="관리자 기능을 준비하고 있습니다."><section className="section"><p>현재는 홈페이지 검토용 버전입니다. 관리자 로그인과 글 저장은 아직 연결되지 않았습니다.</p></section></PageShell>}
`);
write('app/contact/form.tsx', `export default function ContactForm(){return <div className="form" role="status"><h2>온라인 문의 접수 준비 중</h2><p>현재는 홈페이지 검토용 버전입니다. 문의 접수 기능은 아직 연결되지 않았습니다.</p></div>}
`);
for(const endpoint of ['admin','contact'])write('app/api/'+endpoint+'/route.ts', `export async function POST(){return Response.json({error:'현재는 검토용 홈페이지입니다. 저장 기능은 아직 연결되지 않았습니다.'},{status:503})}\n`);
// All pages are review-only; avoid indexing while the site is unfinished.
let layout=read('app/layout.tsx');
layout=layout.replace('description:', 'robots: {index:false, follow:false}, description:');
layout=layout.replace('<body>{children}</body>', '<body><aside style={{background:"#eee6db",color:"#322b27",padding:"10px 20px",textAlign:"center",fontSize:"14px"}}>검토용 홈페이지 · 일부 내용과 기능은 준비 중입니다.</aside>{children}</body>');
write('app/layout.tsx',layout);
write('app/robots.ts', `export default function robots(){return {rules:{userAgent:'*',disallow:'/'}}}\n`);
console.log('Prepared Next.js review build. Admin and inquiry writes are disabled.');
