import { ThemeSelector } from "@/components/ThemeSelector";
import AkLogo from "@/components/Aklogo";
import { useIsMobile } from "@/hooks/use-mobile";

export function Navbar() {
  const isMobile = useIsMobile();

  return (
    <nav
      className={`fixed top-0 left-16 right-16 h-20 z-[99] flex items-center justify-between ${
        isMobile ? "h-[8vh] px-4" : "h-[7vh] px-8"
      }`}
    >
      {/* <h3 className={`font-normal text-foreground ${isMobile ? 'text-lg' : 'text-xl'}`}>
          Brand
        </h3> */}
      <div className={`w-10 h-10 ${isMobile ? "" : "md:w-12 md:h-12"}`}>
        <AkLogo />
        {/* <img src="/assets/ak.svg" className="mt-1" />  */}
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {!isMobile && <ThemeSelector />}
        {/* <Button className={`bg-primary text-primary-foreground rounded-full border-none hover:bg-primary/90 transition-colors ${
            isMobile ? 'px-3 py-1.5 text-sm' : 'px-5 py-2'
          }`}>
            Contact
          </Button> */}
        {isMobile && (
          <div className="ml-2">
            <ThemeSelector />
          </div>
        )}
      </div>
    </nav>
  );
}
