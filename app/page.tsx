import CommentWrapper from "@/components/units/CommentWrapper";
import MainWrapper from "@/components/units/MainWrapper";
import MapWrapper from "@/components/units/MapWrapper";

export default async function Home() {
  return (
    <main className="min-h-dvh px-10 ">
      <MainWrapper />
      <MapWrapper />
      <CommentWrapper />
    </main>
  );
}
