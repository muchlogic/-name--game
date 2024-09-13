import { useState } from "react";
import Card from "../components/Card";

export default function Create() {
  const [cards, setCards] = useState([]);
  const [question, setQuestion] = useState("");
  const [a1, setA1] = useState("");
  const [a2, setA2] = useState("");
  const [a3, setA3] = useState("");
  const [a4, setA4] = useState("");
  // text-center bg-white  py-5 px-40 rounded-md flex flex-col justify-center items-center shadow-md shadow-black
  const Card = ({ number, question, a1, a2, a3, a4 }) => {
    <li className="">
      <h1>Card {number}</h1>
      <h2>{question}</h2>
      <p>{a1}</p>
      <p>{a2}</p>
      <p>{a3}</p>
      <p>{a4}</p>
    </li>;
  };

  let cardNumber = 0;
  function SubmitCard(e) {
    e.preventDefault();
    cardNumber += 1;
    setCards((prev) => [
      ...prev,
      {
        number: cardNumber,
        question: question,
        a1: a1,
        a2: a2,
        a3: a3,
        a4: a4,
      },
    ]);
    setQuestion("");
    setA1("");
    setA2("");
    setA3("");
    setA4("");
  }

  return (
    <>
      <div className={`bg-[url(./public/homeBG.jpg)] flex justify-center`}>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-white text-8xl font-serif py-10">Create Card</h1>
          <div className="text-center bg-white  py-5 px-40 rounded-md flex flex-col justify-center items-center shadow-md shadow-black">
            <form className="flex flex-col">
              <input
                type="text"
                id="Question"
                className="m-4 p-4 rounded-md text-center border-[black] border-[1px]"
                placeholder="Put Question Here"
                value={question}
                onChange={(q) => setQuestion(q.target.value)}
              />
              <div className="flex flex-row">
                <input
                  type="text"
                  id="Answer-1"
                  className="m-4 p-4 rounded-md text-center border-[black] border-[1px]"
                  placeholder="Answer 1"
                  value={a1}
                  onChange={(a) => setA1(a.target.value)}
                />
                <input
                  type="text"
                  id="Answer-2"
                  className="m-4 p-4 rounded-md text-center border-[black] border-[1px]"
                  placeholder="Answer 2"
                  value={a2}
                  onChange={(b) => setA2(b.target.value)}
                />
              </div>
              <div className="flex flex-row">
                <input
                  type="text"
                  id="Answer-3"
                  className="m-4 p-4 rounded-md text-center border-[black] border-[1px]"
                  placeholder="Answer 3"
                  value={a3}
                  onChange={(c) => setA3(c.target.value)}
                />
                <input
                  type="text"
                  id="Answer-4"
                  className="m-4 p-4 rounded-md text-center border-[black] border-[1px]"
                  placeholder="Answer 4"
                  value={a4}
                  onChange={(d) => setA4(d.target.value)}
                />
              </div>
              <button
                onClick={(e) => SubmitCard(e)}
                className="bg-gray-800 text-white text-lg rounded-md mt-4 py-4 hover:bg-slate-900"
              >
                Submit Card
              </button>
            </form>
          </div>
          <ul id="Created" className="flex flex-col">
            {cards.map((card) => {
              <Card card={card} />;
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
