
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import SeatSelection from "./SeatSelection";
import { useToast } from "@/components/ui/use-toast";

interface BusListingProps {
  source: string;
  destination: string;
  date: Date;
}

interface Bus {
  id: string;
  name: string;
  type: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  availableSeats: number;
  rating: number;
  amenities: string[];
}

const BusListing = ({ source, destination, date }: BusListingProps) => {
  const [selectedBus, setSelectedBus] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Mock bus data
  const buses: Bus[] = [
    {
      id: "bus1",
      name: "Karnataka State Express",
      type: "AC Sleeper",
      departureTime: "21:00",
      arrivalTime: "06:00",
      duration: "9h",
      price: 950,
      availableSeats: 23,
      rating: 4.5,
      amenities: ["Charging Point", "Blankets", "Water Bottle", "Reading Light"]
    },
    {
      id: "bus2",
      name: "Seabird Tourists",
      type: "Non-AC Sleeper",
      departureTime: "20:30",
      arrivalTime: "05:30",
      duration: "9h",
      price: 750,
      availableSeats: 15,
      rating: 4.2,
      amenities: ["Water Bottle", "Reading Light"]
    },
    {
      id: "bus3",
      name: "VRL Travels",
      type: "AC Seater",
      departureTime: "22:15",
      arrivalTime: "06:45",
      duration: "8h 30m",
      price: 850,
      availableSeats: 32,
      rating: 4.7,
      amenities: ["Charging Point", "WiFi", "Water Bottle", "Snacks"]
    },
    {
      id: "bus4",
      name: "SRS Travels",
      type: "Volvo AC Sleeper",
      departureTime: "23:00",
      arrivalTime: "07:30",
      duration: "8h 30m",
      price: 1050,
      availableSeats: 8,
      rating: 4.8,
      amenities: ["Charging Point", "Blankets", "Water Bottle", "Reading Light", "WiFi"]
    }
  ];
  
  const toggleBusSelection = (busId: string) => {
    if (selectedBus === busId) {
      setSelectedBus(null);
    } else {
      setSelectedBus(busId);
    }
  };
  
  const handleBookNow = (seatCount: number, totalAmount: number) => {
    const selectedBusDetails = buses.find(bus => bus.id === selectedBus);
    
    if (seatCount > 0) {
      toast({
        title: "Booking Confirmed!",
        description: `${seatCount} seats booked on ${selectedBusDetails?.name} for ₹${totalAmount}`,
      });
      setSelectedBus(null);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select at least one seat to continue",
      });
    }
  };

  return (
    <div className="space-y-6">
      {buses.length === 0 ? (
        <Card className="p-6 text-center">
          <p>No buses found for this route on the selected date.</p>
        </Card>
      ) : (
        buses.map((bus) => (
          <Card key={bus.id} className="overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center">
                    <h3 className="text-xl font-semibold">{bus.name}</h3>
                    <Badge className="ml-3" variant="outline">{bus.type}</Badge>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    {bus.availableSeats} seats available • {bus.rating} ⭐
                  </div>
                </div>
                
                <div className="flex items-center space-x-8">
                  <div className="text-center">
                    <div className="text-lg font-semibold">{bus.departureTime}</div>
                    <div className="text-sm text-gray-500">{format(date, "dd MMM")}</div>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="text-sm text-gray-500">{bus.duration}</div>
                    <div className="w-24 h-0.5 bg-gray-300 relative my-1">
                      <div className="absolute left-0 top-1/2 w-2 h-2 bg-gray-500 rounded-full transform -translate-y-1/2"></div>
                      <div className="absolute right-0 top-1/2 w-2 h-2 bg-gray-500 rounded-full transform -translate-y-1/2"></div>
                    </div>
                    <div className="text-xs text-gray-400">{source} - {destination}</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-lg font-semibold">{bus.arrivalTime}</div>
                    <div className="text-sm text-gray-500">
                      {format(date, "dd") !== format(new Date(date.getTime() + 24 * 60 * 60 * 1000), "dd")
                        ? format(new Date(date.getTime() + 24 * 60 * 60 * 1000), "dd MMM")
                        : format(date, "dd MMM")}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end">
                  <div className="text-2xl font-bold">₹{bus.price}</div>
                  <Button 
                    className="mt-2" 
                    onClick={() => toggleBusSelection(bus.id)}
                    variant={selectedBus === bus.id ? "secondary" : "default"}
                  >
                    {selectedBus === bus.id ? "Hide Seats" : "View Seats"}
                  </Button>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                {bus.amenities.map((amenity, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {amenity}
                  </Badge>
                ))}
              </div>
              
              {selectedBus === bus.id && (
                <div className="mt-6">
                  <Separator className="my-4" />
                  <SeatSelection 
                    busId={bus.id} 
                    basePrice={bus.price} 
                    onBookNow={handleBookNow}
                  />
                </div>
              )}
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default BusListing;
