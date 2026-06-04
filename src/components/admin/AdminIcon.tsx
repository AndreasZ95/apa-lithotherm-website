import Image from 'next/image'

import logo from '../../../public/logo.jpg'

export default function AdminIcon() {
  return (
    <Image
      alt="A.P.A LithoTherm"
      height={28}
      src={logo}
      style={{
        background: '#fff',
        borderRadius: 4,
        height: '28px',
        objectFit: 'contain',
        padding: 3,
        width: '40px',
      }}
      width={40}
    />
  )
}
