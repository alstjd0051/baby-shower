import CommentWrapper from "@/components/units/CommentWrapper";
import MainWrapper from "@/components/units/MainWrapper";
import MapWrapper from "@/components/units/MapWrapper";

export default async function Home() {
  return (
    <section className="dark:bg-white ">
      <MainWrapper />
      <MapWrapper />
      <CommentWrapper />
    </section>
  );
}
