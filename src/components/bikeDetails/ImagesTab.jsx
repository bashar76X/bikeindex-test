const ImagesTab = ({ images }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {images.map((image) => (
        <img
          key={image.id}
          src={image.large}
          alt={image.name}
          className="w-full h-auto rounded-lg shadow-md"
        />
      ))}
    </div>
  );
};

export default ImagesTab;
