import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Hero/Hero";
import HomeMenu from "@/components/HomeMenu/HomeMenu";
import SectionHeaders from "@/components/SectionHeaders/SectionHeaders";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="my-16">
        <SectionHeaders subHeader="our story" mainHeader="About us" />
        <div className="flex gap-4 flex-col max-w-md text-center text-gray-500 mx-auto">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni
            minima odit recusandae. Illum ipsa non repudiandae? Eum ipsam iste
            quos suscipit tempora? Aperiam esse fugiat inventore laboriosam
            officiis quam rem!
          </p>
          <p>
            At consectetur delectus ducimus est facere iure molestias obcaecati
            quaerat vitae voluptate? Aspernatur dolor explicabo iste minus
            molestiae pariatur provident quibusdam saepe?
          </p>
          <p>
            Laborum molestias neque nulla obcaecati odio quia quod reprehenderit
            sit vitae voluptates? Eos, tenetur.
          </p>
        </div>
      </section>
      <section className="my-8">
        <SectionHeaders
          subHeader={`don't hesitate`}
          mainHeader={`Contact us`}
        />
        <div className="text-center mt-8">
          <a
            href="tel:+46738123123"
            className="text-4xl text-gray-500 mt-8 text-4xl underline"
          >
            +46 738 123 123
          </a>
        </div>
      </section>
      {/* <Footer/> */}
    </>
  );
}
