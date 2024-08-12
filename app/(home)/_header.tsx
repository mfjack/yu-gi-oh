const Header = () => {
    return (
        <header className="flex items-center justify-around border-b-white border-b h-16 md:h-20">
            <img src="/logo.png" alt="Yu-Gi-Oh!" className="h-14 md:h-20" />
            <input className="rounded-md max-w-[10rem] focus:outline-none placeholder:text-sm py-1 px-2 text-sm md:text-lg md:max-w-[15rem] " type="text" placeholder="Buscar por nome" />
        </header>
    );
};

export default Header;
