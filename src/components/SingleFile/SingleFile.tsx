import { File } from '@/types/File';
import { Flex, Icon, Image, Text } from '@chakra-ui/react';
import { Dropbox } from 'dropbox';
import React, { FC, useEffect, useState } from 'react';
import { BsFileEarmark } from 'react-icons/bs';

type Props = {
  file: File;
  token: string;
};

export const SingleFile: FC<Props> = ({ file, token }) => {
  const [thumbnail, setThumbnail] = useState('');

  const getThumbnail = async () => {
    const dbx = new Dropbox({
      accessToken: token,
    });

    try {
      const result = await dbx.filesGetThumbnailBatch({
        entries: [{
          path: file.path_lower,
        }]
      }).then(res => res)
      .catch(err => err.status);

      if (result.result.entries[0]['.tag'] === 'success') {
        setThumbnail(result.result.entries[0].thumbnail);
      }
    } catch (error) {
      return;
    }
  }

  useEffect(() => {
    getThumbnail();
  });

  return (
    <Flex direction="column">
    {thumbnail
      ? <Image alt="file thumbnail" src={`data:image/jpeg;base64, ${thumbnail}`} w="40px" h="40px" />
      : <Icon as={BsFileEarmark}  w="40px" h="40px" />}

    <Text>
      {file.name}
      </Text>
  </Flex>
  );
};
