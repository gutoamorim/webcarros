import { useEffect, useState } from "react";
import { Container } from "../../components/container";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { Link } from "react-router-dom";
import { FiImage } from "react-icons/fi";

interface CarsProps {
  id: string;
  name: string;
  year: string;
  uid: string;
  price: string | number;
  city: string;
  km: string;
  images: CarImages[];
}

interface CarImages {
  name: string;
  uid: string;
  url: string;
}

export const Home = () => {
  const [cars, setCars] = useState<CarsProps[]>([]);
  const [loadImages, setLoadImages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    loadCars();
  }, []);

  function loadCars() {
    const carsRef = collection(db, "cars");
    const queryRef = query(carsRef, orderBy("created", "desc"));

    getDocs(queryRef).then((snapshot) => {
      const listCars = [] as CarsProps[];

      snapshot.forEach((doc) => {
        listCars.push({
          id: doc.id,
          name: doc.data().name,
          year: doc.data().year,
          km: doc.data().km,
          city: doc.data().city,
          price: doc.data().price,
          uid: doc.data().uid,
          images: doc.data().images,
        });
      });

      setCars(listCars);
    });
  }

  function handleImageLoad(id: string) {
    setLoadImages((state) => [...state, id]);
  }

  async function handleSearchCar() {
    if (input === "") {
      loadCars();
      return;
    }

    setCars([]);
    setLoadImages([]);

    const q = query(
      collection(db, "cars"),
      where("name", ">=", input.toUpperCase()),
      where("name", "<=", input.toUpperCase() + "\uf8ff")
    );

    const querySnapshot = await getDocs(q);

    const listCars = [] as CarsProps[];

    querySnapshot.forEach((doc) => {
      listCars.push({
        id: doc.id,
        name: doc.data().name,
        year: doc.data().year,
        km: doc.data().km,
        city: doc.data().city,
        price: doc.data().price,
        uid: doc.data().uid,
        images: doc.data().images,
      });
    });

    setCars(listCars);
  }

  return (
    <Container>
      <section className="bg-white p-4 rounded-lg end-full max-w-3xl mx-auto flex justify-center items-center gap-2">
        <input
          type="text"
          className="w-full border-2 rounded-lg h-9 px-3 outline-none"
          placeholder="Digite o nome do carro..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="bg-red-500 h-9 px-8 rounded-lg text-white font-medium"
          onClick={handleSearchCar}
        >
          Buscar
        </button>
      </section>

      <h1 className="font-bold text-center mt-6 text-2xl mb-4">
        Carros novos e usados em todo o Brasil
      </h1>

      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <Link key={car.id} to={`/car/${car.id}`}>
            <section className="w-full bg-white rounded-lg hover:scale-105 transition-all">
              <div
                style={{
                  display: loadImages.includes(car.id) ? "none" : "flex",
                }}
                className="w-full h-72 rounded-lg bg-slate-200 flex items-center justify-center"
              >
                <FiImage color="#fff" size={40} />
              </div>
              <img
                style={{
                  display: loadImages.includes(car.id) ? "block" : "none",
                }}
                className="w-full rounded-lg mb-2 max-h-72"
                src={car.images[0].url}
                alt="Carro"
                onLoad={() => handleImageLoad(car.id)}
              />

              <p className="font-bold mb-2 px-2">{car.name}</p>

              <div className="flex flex-col px-2">
                <span className="text-zinc-700 mb-6">Ano: {car.year}</span>git
                <strong className="text-black font-medium text-xl">
                  R$ {car.price}
                </strong>
              </div>

              <div className="w-full h-px bg-slate-200 my-2"></div>

              <div className="px-2 pb-2">
                <span className="text-zinc-700">{car.city}</span>
              </div>
            </section>
          </Link>
        ))}
      </main>
    </Container>
  );
};
