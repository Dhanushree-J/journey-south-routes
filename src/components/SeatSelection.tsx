
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface SeatSelectionProps {
  busId: string;
  basePrice: number;
  onBookNow: (seatCount: number, totalAmount: number) => void;
}

interface Seat {
  id: string;
  number: string;
  isAvailable: boolean;
  isSelected: boolean;
  price: number;
  type: 'window' | 'middle' | 'aisle';
}

const SeatSelection = ({ busId, basePrice, onBookNow }: SeatSelectionProps) => {
  // Generate seats dynamically
  const generateSeats = (): Seat[] => {
    const seats: Seat[] = [];
    const rows = ['A', 'B', 'C', 'D', 'E'];
    
    rows.forEach(row => {
      for (let i = 1; i <= 6; i++) {
        // Skip middle aisle
        if (i === 3) continue;
        
        const seatNumber = `${row}${i}`;
        
        // Determine seat type
        let type: 'window' | 'middle' | 'aisle';
        if (i === 1 || i === 6) {
          type = 'window';
        } else if (i === 2 || i === 5) {
          type = 'middle';
        } else {
          type = 'aisle';
        }
        
        // Some seats are randomly unavailable
        const isAvailable = Math.random() > 0.3;
        
        // Window seats are slightly more expensive
        const price = type === 'window' ? basePrice + 50 : basePrice;
        
        seats.push({
          id: `${busId}-${seatNumber}`,
          number: seatNumber,
          isAvailable,
          isSelected: false,
          price,
          type
        });
      }
    });
    
    return seats;
  };
  
  const [seats, setSeats] = useState<Seat[]>(generateSeats);
  
  const toggleSeatSelection = (seatId: string) => {
    setSeats(seats.map(seat => 
      seat.id === seatId && seat.isAvailable 
        ? { ...seat, isSelected: !seat.isSelected } 
        : seat
    ));
  };
  
  const selectedSeats = seats.filter(seat => seat.isSelected);
  const totalAmount = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  
  return (
    <div>
      <h4 className="text-lg font-semibold mb-4">Select Seats</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-4 flex items-center justify-between text-sm">
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <div className="w-4 h-4 border rounded mr-2 bg-gray-200"></div>
                <span>Booked</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 border rounded mr-2"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 border rounded mr-2 bg-blue-500"></div>
                <span>Selected</span>
              </div>
            </div>
          </div>
          
          <Card className="p-6 bg-gray-50">
            <div className="mb-8">
              <div className="flex justify-center items-center bg-gray-300 w-full p-2 rounded-md">
                <span>Front</span>
              </div>
            </div>
            
            <div className="flex justify-between">
              <div className="grid grid-cols-2 gap-3">
                {seats.slice(0, 20).map(seat => (
                  seat.number.endsWith('3') ? null : (
                    <button
                      key={seat.id}
                      className={cn(
                        "w-10 h-10 rounded-md flex items-center justify-center text-sm font-medium border",
                        !seat.isAvailable && "bg-gray-200 cursor-not-allowed",
                        seat.isSelected && "bg-blue-500 text-white border-blue-600",
                        seat.isAvailable && !seat.isSelected && "hover:border-blue-500 cursor-pointer"
                      )}
                      onClick={() => toggleSeatSelection(seat.id)}
                      disabled={!seat.isAvailable}
                      title={`Seat ${seat.number} - ₹${seat.price}`}
                    >
                      {seat.number}
                    </button>
                  )
                ))}
              </div>
              
              <div className="w-6"></div>
              
              <div className="grid grid-cols-2 gap-3">
                {seats.slice(20).map(seat => (
                  seat.number.endsWith('3') ? null : (
                    <button
                      key={seat.id}
                      className={cn(
                        "w-10 h-10 rounded-md flex items-center justify-center text-sm font-medium border",
                        !seat.isAvailable && "bg-gray-200 cursor-not-allowed",
                        seat.isSelected && "bg-blue-500 text-white border-blue-600",
                        seat.isAvailable && !seat.isSelected && "hover:border-blue-500 cursor-pointer"
                      )}
                      onClick={() => toggleSeatSelection(seat.id)}
                      disabled={!seat.isAvailable}
                      title={`Seat ${seat.number} - ₹${seat.price}`}
                    >
                      {seat.number}
                    </button>
                  )
                ))}
              </div>
            </div>
          </Card>
        </div>
        
        <div>
          <Card className="p-6">
            <h5 className="text-lg font-semibold mb-4">Booking Summary</h5>
            
            {selectedSeats.length === 0 ? (
              <p className="text-gray-500 my-4">No seats selected</p>
            ) : (
              <div className="space-y-4">
                <div>
                  <h6 className="font-medium">Selected Seats:</h6>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedSeats.map(seat => (
                      <div key={seat.id} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                        {seat.number} - ₹{seat.price}
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Seats ({selectedSeats.length})</span>
                    <span>₹{totalAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Fee</span>
                    <span>₹25</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total Amount</span>
                    <span>₹{totalAmount + 25}</span>
                  </div>
                </div>
              </div>
            )}
            
            <Button 
              className="w-full mt-4" 
              disabled={selectedSeats.length === 0}
              onClick={() => onBookNow(selectedSeats.length, totalAmount + 25)}
            >
              {selectedSeats.length > 0 ? `Book ${selectedSeats.length} Seats` : "Select Seats"}
            </Button>
            
            <div className="mt-4 text-xs text-gray-500">
              By clicking "Book", you agree to our terms and conditions and cancellation policy.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
