"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface Card {
    id: number;
    name: string;
    type: string; // Adicionando o tipo para filtro
    card_images: {
        image_url: string;
    }[];
}

const Home = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [filteredCards, setFilteredCards] = useState<Card[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [cardsPerPage] = useState<number>(12);
    const [searchName, setSearchName] = useState<string>("");
    const [searchType, setSearchType] = useState<string>("");

    useEffect(() => {
        const fetchCard = async () => {
            try {
                const response = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php/");
                const data = await response.json();
                setCards(data.data);
                setFilteredCards(data.data);
            } catch (error) {
                console.error("Erro ao buscar dados do card:", error);
            }
        };

        fetchCard();
    }, []);

    useEffect(() => {
        // Filtragem dos cards
        const filtered = cards.filter((card) => card.name.toLowerCase().includes(searchName.toLowerCase()) && card.type.toLowerCase().includes(searchType.toLowerCase()));
        setFilteredCards(filtered);
    }, [searchName, searchType, cards]);

    // Cálculo da página atual
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(filteredCards.length / cardsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <div className="flex flex-col gap-5 p-5">
                {/* Filtros */}
                <div className="items-center flex justify-center gap-2">
                    <input type="text" placeholder="Buscar por nome" className="focus:none border focus:outline-none p-1 rounded" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
                    <input type="text" placeholder="Buscar por tipo" className="focus:none border focus:outline-none p-1 rounded" value={searchType} onChange={(e) => setSearchType(e.target.value)} />
                </div>

                {/* Cards */}
                <div className="flex flex-wrap gap-3 justify-center items-center">
                    {currentCards.map((card) => (
                        <img className="w-44 transform transition duration-300 ease-in-out hover:scale-105" key={card.id} src={card.card_images[0].image_url} alt={card.name} />
                    ))}
                </div>

                {/* Navegação */}
                <div className="flex justify-center gap-8 items-center bottom-0 absolute self-center mb-3">
                    <button className="bg-gray-900 text-white px-4 py-1 rounded" onClick={handlePrevPage} disabled={currentPage === 1}>
                        <ChevronLeft />
                    </button>
                    <span className="text-white opacity-55">
                        {currentPage} de {Math.ceil(filteredCards.length / cardsPerPage)}
                    </span>
                    <button className="bg-gray-900 text-white px-4 py-1 rounded" onClick={handleNextPage} disabled={currentPage === Math.ceil(filteredCards.length / cardsPerPage)}>
                        <ChevronRight />
                    </button>
                </div>
            </div>
        </>
    );
};

export default Home;
