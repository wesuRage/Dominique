import { useEffect, useState } from "react";

export default function App() {
  const [fontSize, setFontSize] = useState("10vw");
  const [scrollY, setScrollY] = useState(0);
  const [textOpacity, setTextOpacity] = useState(1);
  const [imagesOpacity, setImagesOpacity] = useState([0, 0, 0]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollY(currentScroll);

      // Calcula a opacidade do texto (diminui conforme o scroll)
      const newTextOpacity = Math.max(1 - currentScroll / 500, 0);
      setTextOpacity(newTextOpacity);

      // Calcula a opacidade das imagens (aumenta conforme o scroll com atraso entre elas)
      const baseOpacity = Math.min(currentScroll / 500, 1);
      setImagesOpacity([
        Math.min(baseOpacity * 1.5, 1), // Primeira imagem aparece mais rápido
        Math.min((baseOpacity - 0.2) * 2, 1), // Segunda imagem com pequeno atraso
        Math.min((baseOpacity - 0.4) * 2, 1), // Terceira imagem com mais atraso
      ]);
    };

    // Configura o listener de scroll
    window.addEventListener("scroll", handleScroll);

    // Atualização inicial
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.innerWidth;
      const newFontSize = (viewportWidth * 0.17).toFixed(2);
      setFontSize(`${newFontSize}px`);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="w-full min-h-[200vh] bg-black">
      <section className="fixed w-full">
        <p className="text-center font-bold italic text-gray-600">
          Feito com muito amor pelo seu amado🤍
        </p>
        <p className="text-black">{scrollY}</p>
      </section>
      {/* Altura suficiente para scroll */}
      {/* Seção do texto (fixa) */}
      <section
        className="fixed top-0 w-full h-full flex justify-center items-center"
        style={{ opacity: textOpacity }}
      >
        <h1
          style={{ fontSize }}
          className="leading-none font-bold whitespace-nowrap"
        >
          DOMINIQUE
        </h1>
      </section>
      {/* Seção das imagens (scrollável) */}
      <section className="absolute mt-[100vh] w-full h-full items-center flex justify-center group">
        {/* Div com os textos "te amo" */}
        <div className="absolute z-10 w-full h-full pointer-events-none">
          {/* 20 textos em diferentes posições aleatórias */}
          {[
            "Te amo",
            "Je t'aime",
            "Ich liebe dich",
            "愛してる",
            "Ti amo",
            "Я тебя люблю",
            "我爱你",
            "사랑해",
            "أحبك",
            "Ik hou van jou",
            "Σ'αγαπώ",
            "Mahal kita",
            "Jag älskar dig",
            "Seni seviyorum",
            "Eu te amo",
            "ฉันรักคุณ",
            "Tôi yêu bạn",
            "میں تم سے پیار کرتا ہوں",
            "אני אוהב אותך",
            "Nagligivaget",
          ].map((text, index) => (
            <h5
              key={index}
              className="absolute  opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-in-out text-white whitespace-nowrap text-sm"
              style={{
                // Posições iniciais aleatórias
                left: `${Math.random() * 90}%`,
                top: `${Math.random() * 90}%`,
                // Transição para novas posições aleatórias no hover
                transform: `translate(
                  calc(${Math.random() * 100 - 50}vw - 80%), 
                  calc(${Math.random() * 100 - 50}vh - 80%)
                )`,
                transitionDelay: `${index * 50}ms`,
                filter: "drop-shadow(0 0 2px rgba(255,255,255,0.5))",
              }}
            >
              {text}
            </h5>
          ))}
        </div>

        {/* Suas imagens existentes */}
        <img
          className="relative w-[150px] h-[250px] rounded-2xl transition-all ease-in-out duration-250 scale-110 group-hover:scale-130 group-hover:-rotate-[20deg] group-hover:top-5 group-hover:left-0 left-[150px] filter brightness-105 shadow-[0_0_10px_2px_rgba(255,255,255,0.3)]"
          src="Domi5.jpg"
          alt="Dominique"
          style={{ opacity: imagesOpacity[0] }}
        />

        <img
          className="relative w-[150px] h-[250px] rounded-2xl transition-all ease-in-out duration-250 scale-110 group-hover:scale-130 group-hover:rotate-[5deg] filter brightness-105 shadow-[0_0_10px_2px_rgba(255,255,255,0.3)]"
          src="Domi2.jpg"
          alt="Dominique"
          style={{ opacity: imagesOpacity[1] }}
        />

        <img
          className="relative w-[150px] h-[250px] rounded-2xl transition-all ease-in-out duration-250 scale-110 group-hover:scale-130 group-hover:rotate-[26deg] group-hover:top-10 group-hover:right-0 right-[150px] filter brightness-105 shadow-[0_0_10px_2px_rgba(255,255,255,0.3)]"
          src="Domi1.jpg"
          alt="Dominique"
          style={{ opacity: imagesOpacity[2] }}
        />
      </section>
    </main>
  );
}
