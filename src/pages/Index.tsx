
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
import BusImages from "@/components/BusImages";

const Index = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState<Date>();
  const [searchClicked, setSearchClicked] = useState(false);
  
  const routes = [
    { source: "Bangalore", destination: "Bhatkal" },
    { source: "Bangalore", destination: "Mantralaya" },
    { source: "Bangalore", destination: "Goa" },
    { source: "Chikkamagaluru", destination: "Bangalore" },
    { source: "Hassan", destination: "Bhatkal" },
  ];
  
  const locations = [...new Set(routes.flatMap(route => [route.source, route.destination]))].sort();
  
  const handleSearch = () => {
    if (source && destination && date) {
      setSearchClicked(true);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="hero-gradient text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Book Your Bus Ticket Online</h1>
            <p className="text-lg md:text-xl mb-8">Safe, comfortable, and affordable bus travel</p>
            
            <Card className="p-6 bg-card text-card-foreground rounded-lg shadow-lg">
              <Tabs defaultValue="one-way" className="mb-6">
                <TabsList className="mb-4">
                  <TabsTrigger value="one-way">One Way</TabsTrigger>
                  <TabsTrigger value="round-trip">Round Trip</TabsTrigger>
                </TabsList>
                
                <TabsContent value="one-way">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">From</label>
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
                      <label className="block text-sm font-medium mb-2">To</label>
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
                      <label className="block text-sm font-medium mb-2">Date of Journey</label>
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
                  <div className="p-4 rounded bg-muted">
                    <p className="text-center">Round trip booking coming soon!</p>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
        
        {/* Bus Images Section */}
        <BusImages />
        
        {/* Popular Routes Section */}
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Popular Routes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {routes.map((route, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-lg">{route.source}</div>
                    <div className="text-primary">→</div>
                    <div className="font-semibold text-lg">{route.destination}</div>
                  </div>
                  <Button 
                    className="mt-4 w-full"
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
          <div className="container mx-auto px-4 py-12 bg-muted/30">
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              Buses from {source} to {destination} on {format(date as Date, "PP")}
            </h2>
            <BusListing source={source} destination={destination} date={date as Date} />
          </div>
        )}
        
        {/* Features Section */}
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Why Book With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="text-primary text-4xl mb-4">🎫</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Confirmed Tickets</h3>
              <p className="text-muted-foreground">Instant confirmation and guaranteed seats</p>
            </div>
            <div className="text-center p-6">
              <div className="text-primary text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Best Prices</h3>
              <p className="text-muted-foreground">Get the best deals and offers on all routes</p>
            </div>
            <div className="text-center p-6">
              <div className="text-primary text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Safe & Secure</h3>
              <p className="text-muted-foreground">Trusted payment methods and secure booking</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
