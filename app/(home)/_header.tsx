import Image from "next/image";

const Header = () => {
    return (
        <header className="flex items-center justify-around border-b-white border-b h-20">
            <div className="relative hidden md:block md:h-[80px] md:w-[160px] h-[50px] w-[100px]">
                <Image src="/logo.png" alt="Yu-Gi-Oh!" fill />
            </div>
            <input className="rounded-md max-w-[10rem] focus:outline-none placeholder:text-sm py-1 px-2 text-sm md:text-lg md:max-w-[15rem] " type="text" placeholder="Buscar por nome" />
        </header>
    );
};

export default Header;
