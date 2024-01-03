import Image from "next/image";

export default function MenuItem() {
  return (
    <div className="bg-gray-100 p-4 text-center rounded-lg hover:bg-gray-200">
      {/* fix in here if the image of menu not center or any problem */}
      <div className="w-32 h-32 relative left-1/4">
        <Image
          alt="hihihi"
          src="https://raw.githubusercontent.com/dejwid/food-ordering/master/public/pizza.png"
          // src="/pizza.png"
          // width="245"
          // height="243"
          fill
          className="object-contain"
        />
      </div>
      <div className="my-2 font-semibold text-xl">Pepperoni Pizza</div>
      <div>Lorem ipsum dolor sit amet, qui minim labore adipisicing minim.</div>
      <button className="bg-primary mt-2 text-white rounded-full px-6 py-1">
        Add to cart $12
      </button>
    </div>
  );
}
