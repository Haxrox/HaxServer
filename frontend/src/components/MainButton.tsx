'use client';

import { FluentProvider, webDarkTheme, webLightTheme } from '@fluentui/react-components';
import { Button , Image, tokens } from '@fluentui/react-components';
import { ReactNode, useEffect, useState } from 'react';

export default function MainButton({
  href,
  img
}: {
  href: string
  img: string
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
    <Image
      src={img}
      fit="contain"
      alt="{img}"
    ></Image>
  </Button>
}
