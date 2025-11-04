import Image from "next/image";

export default function Payments() {
  return (
    <div className="flex flex-col gap-5 justify-center items-center border-t border-t-[#D1D5DB] pt-4">
      <div className="flex flex-wrap justify-center gap-4">
        <Image
          src="/icons/optimaIcon.svg"
          alt="Optima"
          width={87}
          height={22}
        />
        <Image src="/icons/megaIcon.svg" alt="MEGA" width={118} height={22} />
        <Image src="/icons/myOIcon.svg" alt="My O!" width={53} height={22} />
        <Image src="/icons/bakaiIcon.svg" alt="Bakai" width={92} height={22} />
      </div>
      <p className="text-[#9CA3AF] text-sm font-normal">
        © ОсОО &quot;Билет Онлайн&quot; 2025
      </p>
    </div>
  );
}
