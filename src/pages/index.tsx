import { Container } from '@nextui-org/react'
import Image from 'next/image'


export default function Home() {
  return (
    <Container
      css={{
        marginLeft: 0,
        justifyContent: 'center',
        alignContent: 'center',
        bg: 'orange',
      }}
    >
      <Image
        src={'/logo.png'}
        alt={''}
        width={400}
        height={400}
        style={{
          objectFit: 'contain',
          borderRadius: 200,
        }}
      />
    </Container >
  )
}
