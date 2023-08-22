'use client'

import Image from 'next/image'
import styles from './page.module.css'
import { HStack, Heading, Button } from '@chakra-ui/react'
import { Providers } from '../app/providers'


export default function Home() {
  return (
    <Providers>
      <Heading>Hi there! Start Uploading Images </Heading>
      <HStack spacing='24px'>
        <Button colorScheme='blue'>Upload Image</Button>
        <Button colorScheme='blue'>Submit</Button>
      </HStack>

    </Providers>
  )
}
