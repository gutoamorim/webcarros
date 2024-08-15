import { Container } from "../../components/container";

export const Home = () => {
  return (
    <Container>
      <section className="bg-white p-4 rounded-lg end-full max-w-3xl mx-auto flex justify-center items-center gap-2">
        <input
          type="text"
          className="w-full border-2 rounded-lg h-9 px-3 outline-none"
          placeholder="Digite o nome do carro..."
        />
        <button className="bg-red-500 h-9 px-8 rounded-lg text-white font-medium">
          Buscar
        </button>
      </section>

      <h1 className="font-bold text-center mt-6 text-2xl mb-4">
        Carros novos e usados em todo o Brasil
      </h1>

      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <section className="w-full bg-white rounded-lg hover:scale-105 transition-all">
          <img
            className="w-full rounded-lg mb-2 max-h-72"
            src="https://image.webmotors.com.br/_fotos/anunciousados/gigante/2024/202408/20240807/mercedesbenz-c-180-1.6-cgi-flex-exclusive-9gtronic-wmimagem21123048541.jpg?s=fill&w=1920&h=1440&q=75"
            alt="Carro"
          />

          <p className="font-bold mb-2 px-2">MERCEDES-BENZ C 180</p>

          <div className="flex flex-col px-2">
            <span className="text-zinc-700 mb-6">Ano 2019/2019 | 70.000</span>
            <strong className="text-black font-medium text-xl">
              R$ 149.900
            </strong>
          </div>

          <div className="w-full h-px bg-slate-200 my-2"></div>

          <div className="px-2 pb-2">
            <span className="text-zinc-700">Cariacica - ES</span>
          </div>
        </section>
      </main>
    </Container>
  );
};
