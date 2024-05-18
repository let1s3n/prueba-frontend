import NavBar from '@/components/modules/NavBar/navBar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function DefaultLayout({ children }: LayoutProps) {
  return (
    <div className="bg-fuchsia50">
      <NavBar />
      <main className="main-container">{children}</main>
    </div>
  );
}
