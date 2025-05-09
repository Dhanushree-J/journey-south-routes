
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import BusListing from "@/components/BusListing";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const Index = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState<Date>();
  const [searchClicked, setSearchClicked] = useState(false);
  
  const routes = [
    { source: "Bangalore", destination: "Bhatkal", image: "/bhatkal.jpg" },
    { source: "Bangalore", destination: "Mantralaya", image: "/mantralaya.jpg" },
    { source: "Bangalore", destination: "Goa", image: "/goa.jpg" },
    { source: "Chikkamagaluru", destination: "Bangalore", image: "/chikmagalur.jpg" },
    { source: "Hassan", destination: "Bhatkal", image: "/hassan.jpg" },
  ];
  
  const locations = [...new Set(routes.flatMap(route => [route.source, route.destination]))].sort();
  
  const handleSearch = () => {
    if (source && destination && date) {
      setSearchClicked(true);
    }
  };

  // Images for the carousel
  const busImages = [
    { src: "/bus1.jpg", alt: "Luxury AC Bus" },
    { src: "/bus2.jpg", alt: "Sleeper Bus Interior" },
    { src: "/bus3.jpg", alt: "Express Bus" },
    { src: "/bus4.jpg", alt: "Volvo Coach" },
  ];
  
  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-800 dark:to-blue-600 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Book Your Bus Ticket Online</h1>
            <p className="text-lg md:text-xl mb-8">Safe, comfortable, and affordable bus travel</p>
            
            <Card className="p-6 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg shadow-lg">
              <Tabs defaultValue="one-way" className="mb-6">
                <TabsList className="mb-4">
                  <TabsTrigger value="one-way">One Way</TabsTrigger>
                  <TabsTrigger value="round-trip">Round Trip</TabsTrigger>
                </TabsList>
                
                <TabsContent value="one-way">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-gray-200">From</label>
                      <Select value={source} onValueChange={setSource}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select departure city" />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-gray-200">To</label>
                      <Select value={destination} onValueChange={setDestination}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select destination city" />
                        </SelectTrigger>
                        <SelectContent>
                          {locations.map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-gray-200">Date of Journey</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  
                  <Button 
                    className="mt-6 w-full md:w-auto bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700" 
                    size="lg"
                    onClick={handleSearch}
                    disabled={!source || !destination || !date}
                  >
                    Search Buses
                  </Button>
                </TabsContent>
                
                <TabsContent value="round-trip">
                  <div className="p-4 rounded bg-gray-50 dark:bg-gray-700">
                    <p className="text-center dark:text-gray-200">Round trip booking coming soon!</p>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
        
        {/* Bus Images Carousel */}
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-8 text-center dark:text-white">Our Fleet</h2>
          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {busImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <div className="aspect-[16/9] relative overflow-hidden rounded-md">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="bus-image w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
                          <h3 className="text-white font-bold text-lg">{image.alt}</h3>
                        </div>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>
        
        {/* Popular Routes Section with Images */}
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-8 text-center dark:text-white">Popular Routes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {routes.map((route, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="destination-image-container">
                  <img
                    src={route.image}
                    alt={`${route.source} to ${route.destination}`}
                    className="destination-image"
                  />
                  <div className="destination-overlay">
                    <div className="font-semibold text-lg">{route.source}</div>
                    <div className="text-blue-300">→</div>
                    <div className="font-semibold text-lg">{route.destination}</div>
                  </div>
                </div>
                <div className="p-4">
                  <Button 
                    className="mt-2 w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                    onClick={() => {
                      setSource(route.source);
                      setDestination(route.destination);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    View Buses
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Bus Listings */}
        {searchClicked && (
          <div className="container mx-auto px-4 py-12 bg-gray-50 dark:bg-gray-800">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">
              Buses from {source} to {destination} on {format(date as Date, "PP")}
            </h2>
            <BusListing source={source} destination={destination} date={date as Date} />
          </div>
        )}
        
        {/* Features Section */}
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-8 text-center dark:text-white">Why Book With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="text-blue-600 dark:text-blue-400 text-4xl mb-4">🎫</div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Confirmed Tickets</h3>
              <p className="text-gray-600 dark:text-gray-300">Instant confirmation and guaranteed seats</p>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="text-blue-600 dark:text-blue-400 text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Best Prices</h3>
              <p className="text-gray-600 dark:text-gray-300">Get the best deals and offers on all routes</p>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="text-blue-600 dark:text-blue-400 text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Safe & Secure</h3>
              <p className="text-gray-600 dark:text-gray-300">Trusted payment methods and secure booking</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
