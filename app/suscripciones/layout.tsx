import NavBar from "../ui/components/navBar";
import { maven_Pro } from "../fonts";


export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className={`${maven_Pro.className}`}>
        {children}
    </div>
  );
}