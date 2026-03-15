import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'RecruitAI - Agentic App Matching',
  description: 'Enterprise recruitment platform powered by Multi-Agent AI architecture',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="app-container">
          <Sidebar />
          <main className="main-content">
            <Header />
            <div className="page-content animate-fade-in">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
