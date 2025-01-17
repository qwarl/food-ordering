import Image from "next/image";
import MenuItem from "../menu/MenuItem/MenuItem";
import SectionHeaders from "../SectionHeaders/SectionHeaders";

export default function HomeMenu() {
  return (
    <section className="">
      <div className="absolute left-0 right-0">
        <div className="absolute h-[189px] w-[109px] -top-16 -z-10">
          <Image
            src="https://raw.githubusercontent.com/dejwid/food-ordering/master/public/sallad1.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>
        <div className="absolute h-[195px] w-[107px] right-0 -top-20 -z-10">
          <Image
            src="https://raw.githubusercontent.com/dejwid/food-ordering/master/public/sallad2.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>
      </div>
      {/* <div className="text-center mb-4"> */}
      {/*   <div className="uppercase text-gray-500 text-base font-semibold"> */}
      {/*     check out */}
      {/*   </div> */}
      {/*   <div className="text-primary text-4xl font-bold italic"> */}
      {/*     Our Best Sellers */}
      {/*   </div> */}
      {/* </div> */}
      <SectionHeaders subHeader='check out' mainHeader='Our Best Sellers'/>
      <div className="grid grid-cols-3 gap-4">
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </div>
    </section>
  );
}
