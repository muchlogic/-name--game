export default function Card(card) {
  return (
    <div className="text-center bg-white  py-5 px-40 rounded-md flex flex-col justify-center items-center shadow-md shadow-black">
      <h1>Card {card.number}</h1>
      <h2>{card.question}</h2>
      <p>{card.a1}</p>
      <p>{card.a2}</p>
      <p>{card.a3}</p>
      <p>{card.a4}</p>
    </div>
  );
}
