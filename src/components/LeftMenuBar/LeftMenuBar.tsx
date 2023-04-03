import { Flex, Heading, Text, Tooltip } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

export const LeftMenuBar = () => {
  return (
    <Flex
      minW="300px"
      w="300px"
      h="100vh"
      borderRight="2px solid #a69e9299"
      p="40px"
      bg="#f7f5f2"
      direction="column"
      gap="30px"
    >
      <Heading>
        Menu
      </Heading>

      <Link href="/app">
        Home
      </Link>

      <Tooltip label="Not implemented" aria-label='A tooltip'>
        <Text cursor="pointer">
          All files
        </Text>
      </Tooltip>

      <Tooltip label="Not implemented" aria-label='A tooltip'>
        <Text cursor="pointer">
          Latest
        </Text>
      </Tooltip>

      <Tooltip label="Not implemented" aria-label='A tooltip'>
        <Text cursor="pointer">
          Selected
        </Text>
      </Tooltip>

      <Tooltip label="Not implemented" aria-label='A tooltip'>
        <Text cursor="pointer">
          Photos
        </Text>
      </Tooltip>
    </Flex>
  )
}
