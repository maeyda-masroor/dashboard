'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Sidebar() {
  const pathname = usePathname();

  return (
    <aside>
        <Link href='/product'>xx</Link>
    </aside>
  );
}
export default Sidebar;