import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Box,
  Grid2,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

// import required modules
import {
  Mousewheel,
  Pagination,
  Navigation,
  EffectCoverflow,
} from "swiper/modules";
import { red } from "@mui/material/colors";
import BigButton from "../components/BigButton";

export default function CreateCard() {
  const [cards, setCards] = useState([
    {
      question: "",
      answers: ["", "", "", ""],
      correct: [false, false, false, false],
      time: 15,
    },
  ]);
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [activeTime, setActiveTime] = useState(15);
  const [nextButtonID, setNextButtonID] = useState(0);

  const defaultCard = {
    question: "",
    answers: ["", "", "", ""],
    correct: [false, false, false, false],
    time: 15,
  };

  const handleAddCard = (e) => {
    setNextButtonID(nextButtonID + 4);
    const newDeck = [...cards, defaultCard];
    setCards(newDeck);
  };

  const getSwiperIndex = (swiper) => {
    const index = swiper.activeIndex;
    setSwiperIndex(index);
    setActiveTime(cards[index].time);
  };

  const changeQuestion = (e, qNumber) => {
    const newCards = cards.map((card, index) => {
      if (index == swiperIndex) {
        let newAnswers = card.answers;
        newAnswers[qNumber] = e.target.value;
        return {
          question: card.question,
          answers: newAnswers,
          correct: card.correct,
          time: card.time,
        };
      } else return card;
    });
    setCards(newCards);
  };

  const changeCardTime = (e) => {
    const newCards = cards.map((card, index) => {
      if (index == swiperIndex)
        return {
          question: card.question,
          answers: card.answers,
          correct: card.correct,
          time: e.target.value,
        };
      else return card;
    });
    setCards(newCards);
    setActiveTime(e.target.value);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
        }}
      >
        {/* <Container sx={{ py: 2, height: "100vh",}}> */}

        <Swiper
          effect={"coverflow"}
          onSlideChange={getSwiperIndex}
          centeredSlides={true}
          slidesPerView={1.2}
          spaceBetween={20}
          mousewheel={true}
          coverflowEffect={{
            rotate: 1,
            stretch: 20,
            depth: 100,
            modifier: 1.2,
            slideShadows: true,
          }}
          slideToClickedSlide={true}
          pagination={{
            clickable: true,
          }}
          modules={[EffectCoverflow, Mousewheel, Pagination]}
          className="mySwiper h-[600px] w-[100%]"
        >
          {cards.map((card, index) => {
            return (
              <SwiperSlide
                key={index}
                className="border-2 border-black bg-white shadow-3dshadow"
              >
                <Typography
                  sx={{ position: "absolute", top: 0, right: 0, mr: 4 }}
                  fontSize={80}
                >
                  {cards[index].time}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      height: "60%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                      alignContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        py: 3,
                      }}
                    >
                      <TextField
                        sx={{
                          textAlign: "center",
                          width: "400px",
                        }}
                        size="large"
                        id="outlined-basic"
                        label="Question"
                        variant="outlined"
                      />
                    </Box>
                    <Box
                      sx={{
                        textAlign: "center",
                        width: "300px",
                        height: "250px",
                        bgcolor: "black",
                        alignSelf: "center",
                      }}
                    ></Box>
                  </Box>
                  <div className="grid grid-cols-2 w-[80%] my-auto gap-10">
                    <div className="flex items-center gap-x-4">
                      <BigButton id={nextButtonID} buttonID={nextButtonID} />
                      <TextField
                        sx={{ width: "100%" }}
                        id="outlined-basic"
                        label="Answer"
                        variant="outlined"
                        onChange={(e) => changeQuestion(e, 0)}
                      />
                    </div>
                    <div className="flex items-center gap-x-4">
                      <BigButton
                        id={nextButtonID + 1}
                        buttonID={nextButtonID + 1}
                      />
                      <TextField
                        sx={{ width: "100%" }}
                        id="outlined-basic"
                        label="Answer"
                        variant="outlined"
                        onChange={(e) => changeQuestion(e, 1)}
                      />
                    </div>
                    <div className="flex items-center gap-x-4">
                      <BigButton
                        id={nextButtonID + 2}
                        buttonID={nextButtonID + 2}
                      />
                      <TextField
                        sx={{ width: "100%" }}
                        id="outlined-basic"
                        label="Answer"
                        variant="outlined"
                        onChange={(e) => changeQuestion(e, 2)}
                      />
                    </div>
                    <div className="flex items-center gap-x-4">
                      <BigButton
                        id={nextButtonID + 3}
                        buttonID={nextButtonID + 3}
                      />
                      <TextField
                        sx={{ width: "100%" }}
                        id="outlined-basic"
                        label="Answer"
                        variant="outlined"
                        onChange={(e) => changeQuestion(e, 3)}
                      />
                    </div>
                  </div>
                </Box>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            gap: 2,
          }}
        >
          <Button
            size="medium"
            variant="outlined"
            onClick={(e) => handleAddCard(e)}
            sx={{ width: "200px", height: "60px" }}
          >
            add card
          </Button>
          <FormControl
            variant="standard"
            sx={{ width: "200px", height: "60px" }}
          >
            <InputLabel id="demo-simple-select-label">Time Limit</InputLabel>
            <Select value={activeTime} label="Time" onChange={changeCardTime}>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl>
          <Button
            size="medium"
            variant="outlined"
            // onClick={(e) => handleAddCard(e)}
            sx={{
              width: "200px",
              height: "60px",
            }}
          >
            Finalize
          </Button>
        </Box>
      </Box>

      {/* </Container> */}
    </>
  );
}
