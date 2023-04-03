import { Folder } from '@/types/Folder';
import { Flex, Icon, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { FcFolder } from 'react-icons/fc';

type Props = {
  folder: Folder;
  path: string;
};

export const SingleFolder: FC<Props> = ({ folder, path }) => {
  const router = useRouter();

  const handleOpenFolder = () => {
    router.push(`${path}/${folder.name}`);
  };

  return (
    <Flex
      direction="column"
      cursor="pointer"
      onClick={handleOpenFolder}
    >
      <Icon as={FcFolder}  w="40px" h="40px" />

      <Text>
        {folder.name}
        </Text>
    </Flex>
  )
}
