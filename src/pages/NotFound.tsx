
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-education-50 px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-bold text-education-500">404</h1>
        <h2 className="text-2xl font-semibold text-education-600 mt-4">Page Not Found</h2>
        <p className="mt-3 text-gray-500">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Button asChild className="bg-education-500 hover:bg-education-600">
            <Link to="/" className="flex items-center justify-center">
              <Home className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
