import { createFileRoute } from "@tanstack/react-router";
import img1 from "../assets/img/image1.png";
import img2 from "../assets/img/image2.png";
import img3 from "../assets/img/image3.png";
import img4 from "../assets/img/image4.png";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full flex flex-col items-center justify-center p-12 gap-2">
      <p className="text-2xl font-semibold mb-8">설문조사 결과</p>
      <img src={img1} alt="Image 1" />
      <img src={img2} alt="Image 2" />
      <img src={img3} alt="Image 3" />
      <img src={img4} alt="Image 4" />
    </div>
  );
}
