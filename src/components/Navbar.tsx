
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-foreground">BusGo</a>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="/" className="text-foreground hover:text-primary transition-colors">Home</a></li>
              <li><a href="/" className="text-foreground hover:text-primary transition-colors">Routes</a></li>
              <li><a href="/" className="text-foreground hover:text-primary transition-colors">Offers</a></li>
              <li><a href="/" className="text-foreground hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </nav>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="outline">Login</Button>
            <Button>Register</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
