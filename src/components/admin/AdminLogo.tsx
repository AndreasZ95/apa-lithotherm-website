import Image from 'next/image'

import logo from '../../../public/logo.jpg'

export default function AdminLogo() {
  return (
    <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <Image
        alt="A.P.A LithoTherm"
        height={58}
        priority
        src={logo}
        style={{
          background: '#fff',
          border: '1px solid rgba(255,255,255,0.18)',
          borderRadius: 8,
          height: '58px',
          objectFit: 'contain',
          padding: 6,
          width: '86px',
        }}
        width={86}
      />
      <strong style={{ color: '#fff', fontSize: 30, lineHeight: 1.1 }}>A.P.A LithoTherm</strong>
    </div>
  )
}
