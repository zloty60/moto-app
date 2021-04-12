import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

export function CarImageGallery({ offerImages }) {
  const images = [];

  if (offerImages) {
    offerImages.forEach((el) => {
      images.push({
        original: el,
        thumbnail: el,
      });
    });
  }

  return (
    <ImageGallery
      showIndex={true}
      items={images}
      showPlayButton={false}
      showThumbnails={false}
      showBullets={true}
    />
  );
}
