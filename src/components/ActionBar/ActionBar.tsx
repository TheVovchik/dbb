import { Icon, Stack, useToast, Button, Input, Flex, Tooltip } from '@chakra-ui/react';
import {AiOutlineUpload} from 'react-icons/ai';
import {MdCreateNewFolder, MdDeleteForever} from 'react-icons/md';
import React, { ChangeEvent, FC, useRef, useState } from 'react';
import { Dropbox } from 'dropbox';
import { useRouter } from 'next/router';
import axios from 'axios';

type Props = {
  path: string;
  token: string;
};

export const ActionBar: FC<Props> = ({ path, token }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const hiddenFileInput = React.useRef<HTMLInputElement | null>(null);
  const toast = useToast();
  const router = useRouter();

  const folderNameInput = useRef<HTMLInputElement | null>(null)

  const handleClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const handleFileNameInput = () => {
    if (folderNameInput.current?.value) {
      console.log(folderNameInput.current?.value)

      setIsDisabled(false);

      return;
    }

    setIsDisabled(true);
  }

  const createFolder = async () => {
    if (folderNameInput.current?.value) {
      const dbx = new Dropbox({
        accessToken: token,
      });
      const currentPath = path ? `${path}/${folderNameInput.current?.value}` : `/${folderNameInput.current?.value}`;

      await axios.post('https://api.dropboxapi.com/2/files/create_folder_v2', { path: currentPath } ,{
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).
      then(res => {
        toast({
          title: 'Success',
          description: "We've added your folder.",
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setIsLoading(false);
        setTimeout(() => {
          router.reload();
        }, 3000)
      })
      .catch((err) => {
        toast({
          title: 'Error',
          description: "Something went wrong",
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        setIsLoading(false);
      })
    }
  }

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setIsLoading(true)
      const file = event.target.files[0];
      const currentPath = path ? `${path}/${file.name}` : `/${file.name}`;

      const dbx = new Dropbox({
        accessToken: token,
      });

    
      await dbx.filesUpload({
        path: currentPath,
        contents: file,
        autorename: true,
        mode: {
          '.tag': 'add',
        },
      }).then(res => {
        toast({
          title: 'Success',
          description: "We've added your file.",
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setIsLoading(false);
        setTimeout(() => {
          router.reload();
        }, 3000)
      })
      .catch((err) => {
        toast({
          title: 'Error',
          description: "Something went wrong",
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        setIsLoading(false);
        console.log(err);
        setTimeout(() => {
          router.reload();
        }, 3000)
      })
    }
  }

  return (
    <Stack
      direction='column'
      spacing={4}
      pos="fixed"
      bg="white"
      w={`calc(50% - 50px)`}
      p="40px 20px 20px 80px"
      top={0}
      left={300}
    >
      <Flex gap="20px" bg="white">
        <label htmlFor='file'>
          <Button
            leftIcon={<Icon as={AiOutlineUpload} w="20px" h="20px" />}
            colorScheme='pink'
            variant='solid'
            onClick={handleClick}
            isLoading={isLoading}
            loadingText='Loading'
          >
            Upload file
          </Button>

          <input
            type="file"
            ref={hiddenFileInput}
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
        </label>

        <Tooltip label="Not implemented" aria-label='A tooltip'>
          <Button
            leftIcon={<Icon as={MdDeleteForever} w="20px" h="20px" />}
            colorScheme='twitter'
            variant='solid'
            onClick={handleClick}
            isLoading={isLoading}
            loadingText='Loading'
            isDisabled={true}
          >
            Delete selected
          </Button>
        </Tooltip>
      </Flex>
      
      
      <Flex gap="10px" bg="white" w={`calc(100% - 50px)`}>
        <Input
          ref={folderNameInput}
          type="text"
          maxW="200px"
          placeholder='folder name'
          onChange={handleFileNameInput}
        />
        <Button
          rightIcon={<Icon as={MdCreateNewFolder} w="20px" h="20px" />}
          colorScheme='blue'
          variant='outline'
          onClick={createFolder}
          isDisabled={isDisabled}
        >
          Create a folder
        </Button>
      </Flex>
    </Stack>
  )
}
