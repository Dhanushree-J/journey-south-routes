
import { Card } from "@/components/ui/card";

const images = [
  {
    url: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=800&auto=format&fit=crop",
    alt: "Modern bus on a highway",
    title: "Luxury Travel"
  },
  {
    url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop",
    alt: "Bus interior with comfortable seats",
    title: "Comfortable Seating"
  },
  {
    url: "https://images.unsplash.com/photo-1509749837427-ac94a2553d0e?q=80&w=800&auto=format&fit=crop",
    alt: "Beautiful landscape view from bus window",
    title: "Scenic Routes"
  }
];

const BusImages = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Experience Comfort & Style</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="h-64 relative">
              <img 
                src={image.url} 
                alt={image.alt} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                <h3 className="text-xl font-semibold">{image.title}</h3>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BusImages;
