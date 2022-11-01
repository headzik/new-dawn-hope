import { Button, Link as NextUILink, Navbar as NextUINavbar } from '@nextui-org/react'
import Color from 'color'
import Logo from 'components/Logo'
import Link from 'next/link'
import { theme } from 'utils/theme'


export default function Navbar() {
  const items = [
    { name: 'Mission', link: '#' },
    { name: 'About us', link: '#' },
    { name: 'Contact us', link: '#' },
    { name: 'Gallery', link: '#' },
  ]
  return (
    <NextUINavbar
      variant='sticky'
      maxWidth={'lg'}
      css={{
        '&.nextui-navbar': {
          bg: Color(theme.colors.lightGreen500).alpha(0.5),
          backdropFilter: 'saturate(180%) blur(10px)',
        }
      }}
      containerCss={{
        $$navbarBlurBackgroundColor: 'none',
        $$navbarBackgroundColor: 'none',
      }}
      disableBlur
    >
      <NextUINavbar.Brand>
        <Link href='/'>
          <Logo />
        </Link>
      </NextUINavbar.Brand>
      <NextUINavbar.Content
        hideIn='xs' variant='underline' activeColor='primary'
      >
        {items.map(({ name, link }) => (
          <NextUINavbar.Link
            block
            key={name}
            href={'#'}
            css={{ color: '$primaryDark', maxHeight: '50%' }}
          >
            {name}
          </NextUINavbar.Link>
        ))}
      </NextUINavbar.Content>
      <NextUINavbar.Content enableCursorHighlight>
        <Button
          color='secondary'
          rounded
        >
          Donate
        </Button>
      </NextUINavbar.Content>
      <NextUINavbar.Toggle showIn='xs' />
      <NextUINavbar.Collapse css={{ bg: '$primaryLight' }}>
        {items.map(({ name, link }) => (
          <NextUINavbar.CollapseItem key={name}>
            <Link
              style={{ minWidth: '100%', }}
              href={'#'}
            >
              <NextUILink
                color='primary'
                css={{ minWidth: '100%', }}
              >
                {name}
              </NextUILink>
            </Link>
          </NextUINavbar.CollapseItem>
        ))}
      </NextUINavbar.Collapse>
    </NextUINavbar >
  )
}
