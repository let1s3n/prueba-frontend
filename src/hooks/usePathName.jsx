
import { useRouter } from 'next/router';

const usePathname = () => {
  const location = useRouter();
  return location.pathname;
}
export default usePathname;