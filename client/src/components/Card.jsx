/* eslint-disable react/prop-types */

export default function Card({ card }) {
  return (
    <div className="bg-white py-5 px-4 rounded-md grid grid-cols-2 justify-center items-center shadow-md shadow-black">
      <h1 className="col-span-2">Card {card.number}</h1>
      <h2 className="col-span-2">{card.question}</h2>
      <p>{card.a1}</p>
      <p>{card.a2}</p>
      <p>{card.a3}</p>
      <p>{card.a4}</p>
    </div>
  );
}
