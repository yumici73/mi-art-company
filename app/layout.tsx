import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title: 'MI ART COMPANY | 미아트컴퍼니', description: '전통을 잇고, 무대를 창작하며, 예술로 사람과 공동체를 연결합니다. 미아트컴퍼니 · 진주교방문화원 · 스토리댄스'};
export default function RootLayout({children}: {children: React.ReactNode}) { return <html lang="ko"><body>{children}</body></html> }
