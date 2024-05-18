import NavBar from '@/components/modules/NavBar/navBar';
interface LayoutProps {
  children: React.ReactNode;
}

export default function DefaultLay({ children }: LayoutProps) {
  return (
    <div className="bg-fuchsia50">
      <NavBar />
      <main className="main-container position-relative">{children}</main>
    </div>
  );
}
