"use client";

import { useEffect, useState } from "react";
import Header from "./_header";
import Image from "next/image";

interface Card {
    id: number;
    name: string;
    card_images: {
        image_url: string;
    }[];
}

const Home = () => {
    const [cards, setCards] = useState<Card[]>([]);

    useEffect(() => {
        const fecthCards = async () => {
            try {
                const response = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php/");
                const data = await response.json();
                setCards(data.data);
            } catch (error) {
                console.log(`Error ao buscar dados do card: ${error}`);
            }
        };

        fecthCards();
    }, []);

    return (
        <>
            <Header />

            <div className="flex flex-wrap items-center justify-center gap-5 p-5">
                {cards.map((card) => (
                    <Image className="duration-500 hover:scale-105 cursor-pointer" key={card.id} src={card.card_images[0].image_url} alt={card.name} width={350} height={350} />
                ))}
            </div>
        </>
    );
};

export default Home;
