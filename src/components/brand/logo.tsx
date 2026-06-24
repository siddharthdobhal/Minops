import { Link } from "@tanstack/react-router";

export function LogoIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <path 
        d="M6 26V8C6 6.89543 6.89543 6 8 6H10.5C11.2366 6 11.9079 6.40243 12.2472 7.04948L16 14.1848L19.7528 7.04948C20.0921 6.40243 20.7634 6 21.5 6H24C25.1046 6 26 6.89543 26 8V26C26 27.1046 25.1046 28 24 28H22C20.8954 28 20 27.1046 20 26V14L16.7906 20.1079C16.4527 20.751 15.5473 20.751 15.2094 20.1079L12 14V26C12 27.1046 11.1046 28 10 28H8C6.89543 28 6 27.1046 6 26Z" 
        fill="currentColor" 
      />
    </svg>
  );
}

export function Logo({ className = "", showText = true }: { className?: string; showText?: boolean }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 text-foreground hover:opacity-90 transition ${className}`}>
      <LogoIcon className="h-6 w-6 text-brand" />
      {showText && (
        <span className="font-display text-lg font-bold tracking-tight">MinOps</span>
      )}
    </Link>
  );
}
