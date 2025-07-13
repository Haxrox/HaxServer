'use client';

import { Button, Image, tokens } from '@fluentui/react-components';

export default function MainButton({
  href,
  img,
  text
}: {
  href: string
  img?: string
  text?: string
}) {
  return <Button
    as="a"
    shape="circular"
    appearance="primary"
    style={{
      paddingBlock: tokens.spacingHorizontalM,
      boxShadow: tokens.shadow16,
      height: '7vh',
    }}
    href={href}
    >
    {/* 將族聖殿 */}
    {
      text ? text : <Image
        src={img}
        fit="contain"
        alt="{text}"
      />
    }
  </Button>
}
