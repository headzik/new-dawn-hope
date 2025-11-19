'use client'

import { useEffect } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import { Menu } from './components/Menu/Menu'
import { MenuList, MenuListItem } from './components/Menu/MenuList'
import { styles } from './styles'


export default function Home() {
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const id = hash.substring(1)
      setTimeout(() => {
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }, [])

  return (
    <main className={styles.main}>

      <div className='w-full h-screen fixed left-0 bottom-0'>
        <Image
          src="/banner.jpg"
          alt="Banner"
          priority
          fill
          className='object-cover'
        />
      </div>

      <header className={styles.header}>
        <div className={styles.headerContent}>
          <a href="#home">
            <Image
              src="/logo.png"
              alt="Logo"
              width={120}
              height={120}
              priority
            />
          </a>
          <Menu />
        </div>
      </header>

      <section className='relative h-screen w-full mt-20' id="home">
        <Image
          src="/banner.jpg"
          alt="Banner"
          priority
          fill
          className='object-cover'
        />
        <div className={clsx(
          'absolute w-full h-full top-0 left-0 bg-black/50',
          'flex flex-col justify-center lg:items-center'
        )}>
          <div className={clsx(
            'w-2/3 px-[5vw]',
            'flex flex-col justify-center gap-5'
          )}>
            <h1 className='text-white font-bold lg:text-7xl'>
              {`Bringing new dawn for children's future.`}
            </h1>
            <MenuListItem
              className="bg-white py-2 px-5 rounded-full uppercase max-w-fit"
              linkTo='mission'
            >
              Learn more
            </MenuListItem>
          </div>
        </div>
      </section>

      <section className={clsx(
        styles.section,
        'bg-white flex flex-col items-center gap-10'
      )}
        id="mission"
      >
        <div className='flex flex-col items-center text-center w-4/5 gap-3 mb-20'>
          <h1>Our mission</h1>
          <p className={styles.lightText}>
            We are committed to making a positive difference in the lives of those in need.<br />
            We provide shelter, food, education, and hope to individuals and families struggling
            with poverty.<br />
            Join us in our mission to create a brighter future for all.
          </p>
        </div>
        <div className='container px-4 sm:px-14 grid grid-cols-3 gap-10'>

          <div className={styles.missionColumn}>
            <div className={styles.missionImageContainer}>
              <Image
                src="/p1.jpg"
                alt="Giving shelter"
                fill
                className='object-cover'
              />
            </div>
            <h4>Giving shelter. Giving food.</h4>
            <p className={styles.lightText}>
              We provide shelter for children so they keep dry during days and nights of rain.<br />
              We offer nutritious meals to children after school twice a week,
              ensuring that no one goes without basic sustenance.
            </p>
          </div>

          <div className={styles.missionColumn}>
            <div className={styles.missionImageContainer}>
              <Image
                src="/p2.jpg"
                alt="Giving Education"
                fill
                className='object-cover'
              />
            </div>
            <h4>Giving education. Fighting poverty.</h4>
            <p className={styles.lightText}>
              We empower children by teaching them skills and helping them to stay away from
              beer drinking and drugs. <br />
              We have the goal to empower individuals and communities to break free from poverty.
            </p>
          </div>

          <div className={styles.missionColumn}>
            <div className={styles.missionImageContainer}>
              <Image
                src="/p3.jpg"
                alt="Giving hope"
                fill
                className='object-cover'
              />
            </div>
            <h4>Changing lives. Giving hope.</h4>
            <p className={styles.lightText}>
              We help individuals to break free from cycles of poverty and hopelessness,
              supporting them as they transform their lives. <br />
              We encourage children to see a brighter future and believe in themselves.
            </p>
          </div>
        </div>
      </section>

      <section className={clsx(
        styles.section,
        'bg-zinc-800'
      )}
        id="about"
      >
        <div className="container px-4 sm:px-16 mx-auto">
          <Image
            src="/about.jpg"
            alt="Founder"
            width={200}
            height={200}
            className='sm:float-left m-auto mb-3 sm:m-3'
          />
          <h2 className='text-white font-bold'>The founder</h2>
          <p className='text-gray-300 font-extralight'>
            {`
              My name is Sibusisiwe Sithole, Busi for short. I am a Zimbabwean woman,
              mother of 2, and grandmother of 5, but raised about 30 children I used
              to accommodate. I always believed in the importance of changing children's
              lives by teaching them skills and helping them to stay away from beer drinking
              and drugs. I was born with a loving kind heart and grew up with the compassion
              to help others. Helping people has always been a part of my life.
            `}
          </p>
          <iframe
            width='480'
            height='320'
            src="https://www.youtube.com/embed/58SP-qUmYf0"
            title="New Dawn Hope Foundation"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className='lg:float-right sm:w-[480px] w-full sm:m-auto lg:mx-3 mt-3'
          />
          <h2 className='text-white font-bold mt-3'>History</h2>
          <p className='text-gray-300 font-extralight'>
            {`
              I started giving food to poor people in the streets in 2004. 
              In 2011 I moved to Knysna (South Africa) while taking care of my sister's two children,
               as she was not able to do that herself due to health problems. I opened an art and craft
                shop which in 2019 was visited by a customer from Sweden who advised me to register a 
                Non Profitable Organization called the New Dawn Hope Foundation. I felt it was time 
                for me to stand and I took it as confirmation from God to help children who are hungry 
                by cooking fresh food for them after school. I became a popular soup kitchen that 
                feeds between 30 to 50 kids twice a week up to now.
              `}
          </p>
          <h2 className='text-white font-bold mt-3'>Challenges</h2>
          <p className='text-gray-300 font-extralight'>
            I have a shop that I must open daily to earn money to feed the kids. During the pandemic, my business
            did not do well and prices continue to rise. It is not easy especially when you do it alone. I use a very
            small stove which makes it challenging to cook. I wake up as early as I can, usually at 3 a.m. to cook
            fresh food for the kids. At the moment I am asking for help from anyone out there to be able to employ
            someone to help me cook, buy food, and buy a bigger stove and necessary kitchen utensils. My biggest
            dream is to see the Foundation grow, to have my own place where I can build a shelter and help more kids out there.
          </p>
        </div>
      </section>

      <section className={clsx(styles.section, 'bg-white')} id="donate">
        <div className="container px-4 sm:px-16 mx-auto">
          <div className="flex flex-col items-center gap-10 text-center">
            <div className='flex-1 flex flex-col items-center gap-5 text-center'>
              <h1>Together we can make a change!</h1>
              <h4 className='text-gray-500 w-2/3'>
                {`We can change these children's lives and produce future leaders to make the world a better place.`}
              </h4>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col col-span-2 xs:col-span-1 text-center h-full items-center">
                <h3>GoGetFounding</h3>
                <iframe
                  src='https://gogetfunding.com/embed-widget2?campaignid=7645624&frame_type=t1'
                  className='w-[290px] h-[460px]'
                  scrolling='no'
                />
              </div>
              <div className="flex flex-col col-span-2 xs:col-span-1 text-center h-full justify-between">
                <h3 className='mb-5 flex-[0.25]'>Bank transfer</h3>
                <div className='flex-1'>
                  <h5>Recipient name</h5>
                  <h3 className='mb-5'>The New Dawn Hope Foundation</h3>
                  <h5>Account number</h5>
                  <h3 className='mb-5'>ZA62798794254</h3>
                  <h5>BIC</h5>
                  <h3>FIRNZAJJXXX</h3>
                </div>
              </div>
            </div>
            <h3>Thank you for being part of the New Dawn Hope Foundation. God bless you!</h3>
          </div>
        </div>
      </section>

      <section className={
        clsx(styles.section,
          'bg-zinc-800/95',
        )}
        id="contact"
      >
        <div className="container flex items-center justify-center">
          <div className='grid grid-cols-2 gap-10'>
            <div className="text-white col-span-2 xs:col-span-1">
              <h4>Contact</h4>
              <p className='font-light'>
                Busi Sithole<br />
                Phone: <a className='text-blue-500 hover:text-blue-600' href="tel:+27835173097">+27835173097</a><br />
                Email: <a className='text-blue-500 hover:text-blue-600' href="mailto:sithole.busi@gmail.com">sithole.busi@gmail.com</a>
              </p>
            </div>
            <div className="text-white col-span-2 xs:col-span-1">
              <h4>Please follow and share</h4>
              <div className='flex mt-2 gap-5'>
                <a href="https://www.facebook.com/newdawnhopefoundation" target="_blank">
                  <Image width={40} height={40} src="/facebook.png" alt='Facebook' />
                </a>
                <a href="https://www.youtube.com/channel/UCPXepquWEQ62SoA-EqrndEA" target="_blank">
                  <Image width={40} height={40} src="/youtube.png" alt='Facebook' />
                </a>
                <a href="https://www.instagram.com/newdawnhope_za/" target="_blank">
                  <Image width={40} height={40} src="/instagram.png" alt='Facebook' />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className={clsx(
        styles.section,
        'bg-white'
      )}>
        <div className="container flex flex-col justify-center items-center gap-10">
          <div className="flex justify-center gap-10 flex-wrap">
            <MenuList />
          </div>
          <p>
            {`Copyright ${new Date().getFullYear()} | All rights reserved`}
          </p>
        </div>
      </footer>
    </main>
  )
}
