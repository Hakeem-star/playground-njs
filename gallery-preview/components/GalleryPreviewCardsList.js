import { GalleryPreviewCardStyled } from "./GalleryPreviewCard";

const images = [
  "/images/pexels-shadestock-4940300.jpg",
  "/images/pexels-roberto-nickson-2661176.jpg",
  "/images/pexels-alvin-ng-4983110.jpg",
];

export default function GalleryPreviewCardsList() {
  return images.map((element, index) => {
    return (
      <GalleryPreviewCardStyled
        key={"p-card" + index}
        image={element}
        className="p-card"
        depth={images.length - index + 1}
      />
    );
  });
}
