import Right from "@/public/Right";
import Image from "next/image";
export default function Hero() {
  return (
    <section className="grid grid-cols-hero mt-4">
      <div className="py-12">
        <div className="font-semibold text-4xl">
          Everything <br /> is better <br /> with a
          <span className="text-primary"> Pizza</span>
        </div>
        <p className="my-6 text-sm text-gray-500">
          Pizza is the missing piece that makes every day complete, a simple yet
          delicious joy in life
        </p>
        <div className="flex gap-4 text-sm">
          <button className="flex justify-center items-center font-bold gap-2 bg-primary uppercase px-4 py-2 rounded-full text-white">
            order now
            <Right />
            {/* <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>   */}
          </button>
          <button className="flex justify-center items-center gap-2 px-6 py-2 font-semibold text-gray-600">
            Learn more
            <Right />
          </button>
        </div>
      </div>
      <div className="relative ">
        <Image
          src="https://raw.githubusercontent.com/dejwid/food-ordering/master/public/pizza.png"
          // src="/pizza.png"
          alt="pizza"
          fill
          className="object-contain"
        />
      </div>
    </section>
  );
}
