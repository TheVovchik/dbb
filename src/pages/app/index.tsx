import { Tag } from '@/types/Tag';
import { SingleFolder } from '@/components/SingleFolder';
import { Box, Flex, Text } from '@chakra-ui/react';
import { v4 as uuid } from 'uuid';
import { SingleFile } from '@/components/SingleFile';
import { Folder } from '@/types/Folder';
import { File } from '@/types/File';
import { FC, useState, useEffect } from 'react';
import { LeftMenuBar } from '@/components/LeftMenuBar';
import { ActionBar } from '@/components/ActionBar';
import { Dropbox } from 'dropbox';
import { getItemFromLS } from '@/localstorage/localstorage';

const Index: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState('');
  const [datas, setDatas] = useState<(File | Folder)[]>([])
  const [thisPath, setThisPath] = useState('');
  const [folders, setFolders] = useState<Folder[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const getDatas = async () => {
    const dbx = new Dropbox({
      accessToken: token,
    });

    const result = await dbx.filesListFolder({
        path: '',
      }).then(res => res.result)
        .catch(error => error);


    if (result.entries) {
      setDatas(result.entries);
    } else {
      setDatas([]);
    }
  };

  useEffect(() => {
    if (datas) {
      const foldersFromDropbox: Folder[] = [];
      const filesFromDropbox: File[] = [];

      datas.forEach((data: File | Folder) => {
        if (data['.tag'] as Tag === Tag.FILE) {
          filesFromDropbox.push(data as File);
          
          return;
        }

        foldersFromDropbox.push(data as Folder);
      })

      setFolders(foldersFromDropbox);
      setFiles(filesFromDropbox);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 3000)
  }, [datas])

  useEffect(() => {
    const currentPath = "/app";

    if (token) {
      setThisPath(currentPath);
      getDatas();
    }
  }, [token]);

  useEffect(() => {
    const token = getItemFromLS('token');

    setToken(token);
  }, []);

  return (
    <Flex w="100vw" h="100vh" >
      <LeftMenuBar />

      <Flex direction="column" p="40px" gap="20px" maxH="100vh" overflowY="auto" w="100%" pos="relative">
        <ActionBar path="" token={token} />
        <Box minH="100px" w="100%" bg="white" />

        <Flex direction="column" gap="10px" bg="white" p="20px" minW="400px">
          {datas.length !==0 && (<Flex direction="column" gap="10px" bg="white" p="20px" minW="400px">
          {folders.map((folder) => {
            return (
              <SingleFolder key={uuid()} folder={folder} path={`${thisPath}`} />
            );
          })}

          {files.map((file) => {
            return (
              <SingleFile key={uuid()} file={file} token={token} />
            );
          })}
        </Flex>)}
        
          {folders.length === 0 && files.length === 0 && !isLoading && <Text>{'<folder is empty>'}</Text>}
        </Flex>
      </Flex>
      
    </Flex>
  )
}

export default Index;
