import CommentWrapper from "@/components/units/CommentWrapper";
import MainWrapper from "@/components/units/MainWrapper";
import MapWrapper from "@/components/units/MapWrapper";

export default async function Home() {
  return (
    <div className="min-h-dvh">
      <MainWrapper />
      <MapWrapper />
      <CommentWrapper />
    </div>
  );
}
