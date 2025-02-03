'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Sidebar() {
  const pathname = usePathname();

  return (
    <aside>
    <Link href='/login'>LOGIN</Link>
    </aside>
  );
}
export default Sidebar;