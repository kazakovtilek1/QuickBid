import Image from "next/image"

export default function Banner() {
  return (
    <div className="relative max-w-[1180px] mx-auto w-full h-[115px] my-8 cursor-pointer">
      <Image src="/images/banner.png" alt="Banner" fill />
    </div>
  )
}
