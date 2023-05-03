import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <div className="bg-gray-800 h-full lg:min-h-[90vh]">
            <div className="flex flex-col">
                <Link
                    href="/resolver"
                    className={`w-full py-3 text-center ${pathname === "/resolver" ? "font-medium border-l-2 border-teal-500 text-teal-500 bg-gray-700" : "border-l-0 border-transparent text-white"
                        } hover:text-teal-500 hover:bg-gray-700 transition-all duration-200`}
                >
                    Resolver
                </Link>
                <Link
                    href="/registrar"
                    className={`w-full py-3 text-center ${pathname === "/registrar" ? "font-medium border-l-2 border-teal-500 text-teal-500 bg-gray-700" : "border-l-0 border-transparent text-white"
                        } hover:text-teal-500 hover:bg-gray-700 transition-all duration-200`}
                >
                    Registrar
                </Link>
                <Link
                    href="/transfer"
                    className={`w-full py-3 text-center ${pathname === "/transfer" ? "font-medium border-l-2 border-teal-500 text-teal-500 bg-gray-700" : "border-l-0 border-transparent text-white"
                        } hover:text-teal-500 hover:bg-gray-700 transition-all duration-200`}
                >
                    Transfer
                </Link>
                <Link
                    href="/send"
                    className={`w-full py-3 text-center ${pathname === "/send" ? "font-medium border-l-2 border-teal-500 text-teal-500 bg-gray-700" : "border-l-0 border-transparent text-white"
                        } hover:text-teal-500 hover:bg-gray-700 transition-all duration-200`}
                >
                    Wallet
                </Link>
            </div>
        </div>
    );
};
export default Sidebar;
  