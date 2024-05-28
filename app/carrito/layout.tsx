import { maven_Pro } from "../fonts";
import NavBar from "../ui/components/navBar";


export default function Layout({children}: {children: React.ReactNode}) {
  const logo = "/logo.png"
  return (
    <div className={`${maven_Pro.className} bg-[#3B0613] h-full`}>
        {children}
    </div>
  );
}