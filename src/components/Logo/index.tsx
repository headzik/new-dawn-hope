import Image from 'next/image'


export default function Logo() {
  return (
    <Image
      src={'/logo.png'}
      alt={'logo'}
      width={70}
      height={70}
      style={{
        borderRadius: 50
      }}
    />
  )
}
