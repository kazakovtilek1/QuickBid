import About from "./navBar/About";
import Contacts from "./navBar/Contacts";
import Purchase from "./navBar/Purchase";
import Subscribe from "./navBar/Subscribe";
import Payments from "./payments/Payments";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] mt-24 pt-6 pb-5">
      <div className="max-w-[1180px] mx-auto grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 mb-5 px-2.5">
        <About />
        <Purchase />
        <Subscribe />
        <Contacts />
      </div>
      <Payments />
    </footer>
  );
}
