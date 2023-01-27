import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DetailsHeader from "../components/DetailsHeader";
import Error from "../components/Error";
import Loader from "../components/Loader";
import RelatedSongs from "../components/RelatedSongs";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from "../redux/services/shazamCore";

const SongDetails = () => {
  const { songId, id: artistId } = useParams();
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {
    data,
    isFetching: isFetchinRelatedSongs,
    error,
  } = useGetSongRelatedQuery({ songId });
  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery({ songId });
  if (isFetchingSongDetails && isFetchinRelatedSongs)
    return <Loader title="Searching song details" />;
  if (error) return <Error />;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  return (
    <div className="flex flex-col">
      <DetailsHeader artistsId="" songData={songData} />
      <div className="mt-10">
        <h2 className="text-3xl font-bold text-white">Lyriks:</h2>
        <div className="mt-5">
          {songData?.sections[1].type === "LYRICS" ? (
            songData?.sections[1].text.map((line, i) => (
              <p key={i} className="my-1 text-base font-normal text-gray-400">
                {line}
              </p>
            ))
          ) : (
            <p className="text-base font-normal text-gray-400">
              Sorry, no lyrics found!
            </p>
          )}
        </div>
      </div>
      <RelatedSongs
        data={data}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default SongDetails;
