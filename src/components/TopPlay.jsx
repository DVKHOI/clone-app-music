import TopChartCard from "./TopChartCard";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { Link } from "react-router-dom";
import { FreeMode } from "swiper";
import "swiper/css/free-mode";
import "swiper/css";

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const divRef = useRef(null);
  const topPlays = data?.slice(0, 5);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col"
    >
      <div className="flex flex-col w-full">
        <div className="flex flex-row items-center justify-between">
          <h2 className="font-bold text-white">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-base text-gray-300 cursor-pointer">See more</p>
          </Link>
        </div>
        <div className="flex flex-col gap-1 mt-4">
          {topPlays?.map((song, i) => (
            <TopChartCard
              key={song.key}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, i)}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col w-full mt-8">
        <div className="flex flex-row items-center justify-between">
          <h2 className="font-bold text-white">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-base text-gray-300 cursor-pointer">See more</p>
          </Link>
        </div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlays?.map((song, i) => (
            <SwiperSlide
              key={song?.key}
              style={{ width: "25%", height: "auto" }}
              className="rounded-full shadow-lg animate-slideright"
            >
              <Link to={`/artists/${song?.artists[0].adamid}`}>
                <img
                  src={song?.images.background}
                  alt="song-artists"
                  className="object-cover w-full rounded-full"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
